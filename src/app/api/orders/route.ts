import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';

// Schema pour créer une commande
const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  })).min(1, 'Au moins un article requis'),
  shippingAddress: z.string().optional(),
  notes: z.string().optional(),
});

// GET /api/orders - Liste des commandes
export async function GET(req: NextRequest) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const { searchParams } = new URL(req.url);
    const isAdmin = user?.role === 'ADMIN';
    
    // Filtres
    const userId = searchParams.get('userId');
    const status_filter = searchParams.get('status');
    const orderNumber = searchParams.get('orderNumber');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Construction de la requête
    const where: any = {};
    
    // Si pas admin, ne voir que ses commandes
    if (!isAdmin) {
      where.userId = user!.id;
    } else if (userId) {
      where.userId = userId;
    }

    if (status_filter) {
      where.status = status_filter;
    }

    if (orderNumber) {
      where.orderNumber = { contains: orderNumber, mode: 'insensitive' };
    }

    // Récupération des commandes
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
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
              paidAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.order.count({ where }),
    ]);

    // Statistiques
    const stats = await prisma.order.groupBy({
      by: ['status'],
      _count: { id: true },
      _sum: { total: true },
      where: !isAdmin ? { userId: user!.id } : {},
    });

    return NextResponse.json({
      success: true,
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      statistics: {
        total,
        byStatus: stats.reduce((acc: any, stat: any) => {
          acc[stat.status] = {
            count: stat._count.id,
            totalAmount: stat._sum.total || 0,
          };
          return acc;
        }, {}),
      },
    });
  } catch (error: any) {
    console.error('Erreur GET /api/orders:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/orders - Créer une commande
export async function POST(req: NextRequest) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const body = await req.json();
    const data = createOrderSchema.parse(body);

    // Vérifier la disponibilité des produits et calculer le total
    const productIds = data.items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
      },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: 'Un ou plusieurs produits non disponibles' },
        { status: 400 }
      );
    }

    // Vérifier le stock et calculer les totaux
    let subtotal = 0;
    const orderItems: any[] = [];

    for (const item of data.items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Produit ${item.productId} introuvable` },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuffisant pour ${product.name} (disponible: ${product.stock})` },
          { status: 400 }
        );
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal,
      });
    }

    // Calculer les frais
    const shippingFee = subtotal >= 50000 ? 0 : 2500; // Livraison gratuite > 50000 FCFA
    const discount = 0; // À implémenter avec les codes promo
    const total = subtotal + shippingFee - discount;

    // Générer un numéro de commande unique
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Créer la commande avec les items et mettre à jour le stock
    const order = await prisma.$transaction(async (tx) => {
      // Créer la commande
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: user!.id,
          subtotal,
          shippingFee,
          discount,
          total,
          shippingAddress: data.shippingAddress,
          notes: data.notes,
          status: 'PENDING',
          items: {
            create: orderItems,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      // Décrémenter le stock
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    return NextResponse.json(
      {
        success: true,
        order,
        message: 'Commande créée avec succès',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erreur POST /api/orders:', error);
    
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
