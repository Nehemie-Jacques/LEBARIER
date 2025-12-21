import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';

// Schema pour créer un avis
const createReviewSchema = z.object({
  appointmentId: z.string(),
  employeeId: z.string(),
  serviceRating: z.number().int().min(1).max(5),
  employeeRating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  photos: z.array(z.string().url()).optional(),
});

// GET /api/reviews - Liste des avis
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Filtres
    const employeeId = searchParams.get('employeeId');
    const userId = searchParams.get('userId');
    const isApproved = searchParams.get('isApproved');
    const minRating = searchParams.get('minRating');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Construction de la requête
    const where: any = {};
    
    if (employeeId) {
      where.employeeId = employeeId;
    }

    if (userId) {
      where.userId = userId;
    }

    if (isApproved !== null && isApproved !== undefined) {
      where.isApproved = isApproved === 'true';
    }

    if (minRating) {
      where.OR = [
        { serviceRating: { gte: parseInt(minRating) } },
        { employeeRating: { gte: parseInt(minRating) } },
      ];
    }

    // Récupération des avis
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          employee: {
            select: {
              id: true,
              bio: true,
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
            select: {
              id: true,
              date: true,
              service: {
                select: {
                  id: true,
                  name: true,
                  nameEn: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.review.count({ where }),
    ]);

    // Statistiques
    const stats = await prisma.review.aggregate({
      where,
      _avg: {
        serviceRating: true,
        employeeRating: true,
      },
      _count: {
        id: true,
      },
    });

    const approvedCount = await prisma.review.count({
      where: { ...where, isApproved: true },
    });

    return NextResponse.json({
      success: true,
      reviews,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      statistics: {
        total,
        approved: approvedCount,
        pending: total - approvedCount,
        averageServiceRating: stats._avg.serviceRating || 0,
        averageEmployeeRating: stats._avg.employeeRating || 0,
      },
    });
  } catch (error: any) {
    console.error('Erreur GET /api/reviews:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Créer un avis
export async function POST(req: NextRequest) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const body = await req.json();
    const data = createReviewSchema.parse(body);

    // Vérifier que le rendez-vous existe et appartient à l'utilisateur
    const appointment = await prisma.appointment.findUnique({
      where: { id: data.appointmentId },
      include: {
        service: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Rendez-vous introuvable' },
        { status: 404 }
      );
    }

    if (appointment.userId !== user!.id) {
      return NextResponse.json(
        { error: 'Ce rendez-vous ne vous appartient pas' },
        { status: 403 }
      );
    }

    // Vérifier que le rendez-vous est terminé
    if (appointment.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Le rendez-vous doit être terminé pour laisser un avis' },
        { status: 400 }
      );
    }

    // Vérifier qu'un avis n'existe pas déjà
    const existingReview = await prisma.review.findUnique({
      where: { appointmentId: data.appointmentId },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: 'Un avis existe déjà pour ce rendez-vous' },
        { status: 400 }
      );
    }

    // Vérifier que l'employé correspond au rendez-vous
    if (appointment.employeeId !== data.employeeId) {
      return NextResponse.json(
        { error: 'Employé non correspondant au rendez-vous' },
        { status: 400 }
      );
    }

    // Créer l'avis
    const review = await prisma.review.create({
      data: {
        userId: user!.id,
        appointmentId: data.appointmentId,
        employeeId: data.employeeId,
        serviceRating: data.serviceRating,
        employeeRating: data.employeeRating,
        comment: data.comment,
        photos: data.photos || [],
        isApproved: false, // Nécessite approbation admin
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        employee: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        appointment: {
          select: {
            date: true,
            service: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Mettre à jour la note moyenne de l'employé
    const employeeReviews = await prisma.review.findMany({
      where: {
        employeeId: data.employeeId,
        isApproved: true,
      },
    });

    const avgRating = employeeReviews.length > 0
      ? employeeReviews.reduce((sum, r) => sum + r.employeeRating, 0) / employeeReviews.length
      : 0;

    await prisma.employee.update({
      where: { id: data.employeeId },
      data: { rating: avgRating },
    });

    return NextResponse.json(
      {
        success: true,
        review,
        message: 'Avis créé avec succès (en attente d\'approbation)',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erreur POST /api/reviews:', error);
    
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
