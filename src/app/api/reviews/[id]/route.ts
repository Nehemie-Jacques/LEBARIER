import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';

// Schema pour mettre à jour un avis
const updateReviewSchema = z.object({
  comment: z.string().optional(),
  photos: z.array(z.string().url()).optional(),
  serviceRating: z.number().int().min(1).max(5).optional(),
  employeeRating: z.number().int().min(1).max(5).optional(),
});

// Schema pour la réponse admin
const respondReviewSchema = z.object({
  response: z.string().min(1, 'La réponse ne peut pas être vide'),
});

// Schema pour approuver/rejeter
const approveReviewSchema = z.object({
  isApproved: z.boolean(),
});

// GET /api/reviews/[id] - Détails d'un avis
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        employee: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        appointment: {
          include: {
            service: {
              select: {
                id: true,
                name: true,
                nameEn: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!review) {
      return NextResponse.json(
        { error: 'Avis introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      review,
    });
  } catch (error: any) {
    console.error('Erreur GET /api/reviews/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/reviews/[id] - Mettre à jour un avis
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
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action'); // approve, respond, update

    // Vérifier que l'avis existe
    const existingReview = await prisma.review.findUnique({
      where: { id: params.id },
    });

    if (!existingReview) {
      return NextResponse.json(
        { error: 'Avis introuvable' },
        { status: 404 }
      );
    }

    // Action: Approuver/Rejeter (Admin seulement)
    if (action === 'approve') {
      const { error: adminError, status: adminStatus } = await requireAdmin();
      if (adminError) {
        return NextResponse.json({ error: adminError }, { status: adminStatus });
      }

      const data = approveReviewSchema.parse(body);

      const review = await prisma.review.update({
        where: { id: params.id },
        data: { isApproved: data.isApproved },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          employee: true,
        },
      });

      // Recalculer la note de l'employé si approuvé
      if (data.isApproved) {
        const employeeReviews = await prisma.review.findMany({
          where: {
            employeeId: existingReview.employeeId,
            isApproved: true,
          },
        });

        const avgRating = employeeReviews.length > 0
          ? employeeReviews.reduce((sum, r) => sum + r.employeeRating, 0) / employeeReviews.length
          : 0;

        await prisma.employee.update({
          where: { id: existingReview.employeeId },
          data: { rating: avgRating },
        });
      }

      return NextResponse.json({
        success: true,
        review,
        message: data.isApproved ? 'Avis approuvé avec succès' : 'Avis rejeté',
      });
    }

    // Action: Répondre à un avis (Admin seulement)
    if (action === 'respond') {
      const { error: adminError, status: adminStatus } = await requireAdmin();
      if (adminError) {
        return NextResponse.json({ error: adminError }, { status: adminStatus });
      }

      const data = respondReviewSchema.parse(body);

      const review = await prisma.review.update({
        where: { id: params.id },
        data: {
          response: data.response,
          respondedAt: new Date(),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        review,
        message: 'Réponse ajoutée avec succès',
      });
    }

    // Action: Modifier l'avis (Propriétaire seulement)
    const isOwner = existingReview.userId === user?.id;
    const isAdmin = user?.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'Non autorisé à modifier cet avis' },
        { status: 403 }
      );
    }

    const data = updateReviewSchema.parse(body);

    const review = await prisma.review.update({
      where: { id: params.id },
      data: {
        ...(data.comment !== undefined && { comment: data.comment }),
        ...(data.photos && { photos: data.photos }),
        ...(data.serviceRating && { serviceRating: data.serviceRating }),
        ...(data.employeeRating && { employeeRating: data.employeeRating }),
        // Remettre en attente d'approbation si modifié par l'utilisateur
        ...(isOwner && !isAdmin && { isApproved: false }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        employee: true,
      },
    });

    // Recalculer la note de l'employé si les notes ont changé
    if (data.employeeRating && review.isApproved) {
      const employeeReviews = await prisma.review.findMany({
        where: {
          employeeId: existingReview.employeeId,
          isApproved: true,
        },
      });

      const avgRating = employeeReviews.length > 0
        ? employeeReviews.reduce((sum, r) => sum + r.employeeRating, 0) / employeeReviews.length
        : 0;

      await prisma.employee.update({
        where: { id: existingReview.employeeId },
        data: { rating: avgRating },
      });
    }

    return NextResponse.json({
      success: true,
      review,
      message: 'Avis mis à jour avec succès',
    });
  } catch (error: any) {
    console.error('Erreur PUT /api/reviews/[id]:', error);

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

// DELETE /api/reviews/[id] - Supprimer un avis
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const review = await prisma.review.findUnique({
      where: { id: params.id },
    });

    if (!review) {
      return NextResponse.json(
        { error: 'Avis introuvable' },
        { status: 404 }
      );
    }

    // Vérifier les permissions
    const isOwner = review.userId === user?.id;
    const isAdmin = user?.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: 'Non autorisé à supprimer cet avis' },
        { status: 403 }
      );
    }

    // Supprimer l'avis
    await prisma.review.delete({
      where: { id: params.id },
    });

    // Recalculer la note de l'employé
    const employeeReviews = await prisma.review.findMany({
      where: {
        employeeId: review.employeeId,
        isApproved: true,
      },
    });

    const avgRating = employeeReviews.length > 0
      ? employeeReviews.reduce((sum, r) => sum + r.employeeRating, 0) / employeeReviews.length
      : 0;

    await prisma.employee.update({
      where: { id: review.employeeId },
      data: { rating: avgRating },
    });

    return NextResponse.json({
      success: true,
      message: 'Avis supprimé avec succès',
    });
  } catch (error: any) {
    console.error('Erreur DELETE /api/reviews/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}
