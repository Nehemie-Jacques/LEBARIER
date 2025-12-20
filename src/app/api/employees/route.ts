import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createEmployeeSchema = z.object({
  userId: z.string().cuid(),
  bio: z.string().optional(),
  bioEn: z.string().optional(),
  specialties: z.array(z.string()).min(1),
  isAvailable: z.boolean().default(true),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isAvailable = searchParams.get('isAvailable');
    const specialty = searchParams.get('specialty');
    const where: any = {};
    if (isAvailable !== null) where.isAvailable = isAvailable === 'true';
    if (specialty) where.specialties = { has: specialty };

    const employees = await prisma.employee.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
            isActive: true,
          },
        },
        _count: {
          select: {
            appointments: true,
            reviews: true,
            portfolio: true,
          },
        },
      },
      orderBy: { rating: 'desc' },
    });

    const total = employees.length;
    const available = employees.filter((e) => e.isAvailable).length;

    return NextResponse.json({
      success: true,
      employees,
      statistics: {
        total,
        available,
        unavailable: total - available,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { user, error, status } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const data = createEmployeeSchema.parse(body);

    const userExists = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!userExists) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });
    }

    if (userExists.role !== 'EMPLOYEE') {
      return NextResponse.json({ error: 'Rôle EMPLOYEE requis' }, { status: 400 });
    }

    const existingEmployee = await prisma.employee.findUnique({
      where: { userId: data.userId },
    });

    if (existingEmployee) {
      return NextResponse.json({ error: 'Profil employé existe déjà' }, { status: 400 });
    }

    const employee = await prisma.employee.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, message: 'Profil employé créé', employee },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Données invalides',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
