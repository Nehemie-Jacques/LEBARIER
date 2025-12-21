import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';

// Schema pour mettre à jour une commande
const updateOrderSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']).optional(),
  trackingNumber: z.string().optional(),
  shippingAddress: z.string().optional(),
  notes: z.string().optional(),
});

// GET /api/orders/[id] - Détails d'une commande
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                nameEn: true,
                slug: true,
                images: true,
                price: true,
                category: true,
              },
            },
          },
        },
        payment: {
          select: {
            id: true,
            method: true,
            status: true,
            amount: true,
            transactionId: true,
            paidAt: true,
            createdAt: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Commande introuvable' },
        { status: 404 }
      );
    }

    // Vérifier les permissions
    if (user?.role !== 'ADMIN' && order.userId !== user?.id) {
      return NextResponse.json(
        { error: 'Accès non autorisé à cette commande' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    console.error('Erreur GET /api/orders/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/orders/[id] - Mettre à jour une commande
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const body = await req.json();
    const data = updateOrderSchema.parse(body);

    // Vérifier que la commande existe
    const existingOrder = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Commande introuvable' },
        { status: 404 }
      );
    }

    // Permissions : Admin peut tout modifier, utilisateur seulement annuler
    const isAdmin = user?.role === 'ADMIN';
    const isOwner = existingOrder.userId === user?.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 403 }
      );
    }

    // Si non-admin, seule l'annulation est autorisée et uniquement si PENDING ou CONFIRMED
    if (!isAdmin) {
      if (data.status && data.status !== 'CANCELLED') {
        return NextResponse.json(
          { error: 'Vous ne pouvez que annuler votre commande' },
          { status: 403 }
        );
      }

      if (!['PENDING', 'CONFIRMED'].includes(existingOrder.status)) {
        return NextResponse.json(
          { error: 'Vous ne pouvez plus annuler cette commande' },
          { status: 400 }
        );
      }
    }

    // Si annulation, remettre le stock
    if (data.status === 'CANCELLED' && existingOrder.status !== 'CANCELLED') {
      await prisma.$transaction(async (tx) => {
        for (const item of existingOrder.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }
      });
    }

    // Mettre à jour la commande
    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        ...(data.status && { status: data.status }),
        ...(data.trackingNumber && { trackingNumber: data.trackingNumber }),
        ...(data.shippingAddress && { shippingAddress: data.shippingAddress }),
        ...(data.notes && { notes: data.notes }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
    });

    return NextResponse.json({
      success: true,
      order,
      message: 'Commande mise à jour avec succès',
    });
  } catch (error: any) {
    console.error('Erreur PUT /api/orders/[id]:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/orders/[id] - Supprimer une commande (Admin seulement)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error, status } = await requireAdmin();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Commande introuvable' },
        { status: 404 }
      );
    }

    // Remettre le stock si la commande n'est pas livrée ou annulée
    if (!['DELIVERED', 'CANCELLED', 'REFUNDED'].includes(order.status)) {
      await prisma.$transaction(async (tx) => {
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }
      });
    }

    // Supprimer la commande (cascade sur items et payment)
    await prisma.order.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Commande supprimée avec succès',
    });
  } catch (error: any) {
    console.error('Erreur DELETE /api/orders/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}
