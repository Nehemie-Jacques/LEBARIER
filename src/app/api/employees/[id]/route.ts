import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateEmployeeSchema = z.object({
  bio: z.string().optional(),
  bioEn: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  isAvailable: z.boolean().optional(),
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
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
        portfolio: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        availability: {
          where: { isActive: true },
          orderBy: { dayOfWeek: 'asc' },
        },
        statistics: true,
        _count: {
          select: {
            appointments: true,
            reviews: true,
          },
        },
      },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Employé introuvable' }, { status: 404 });
    }

    return NextResponse.json({ success: true, employee });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { user, error, status } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const data = updateEmployeeSchema.parse(body);

    const employee = await prisma.employee.update({
      where: { id: params.id },
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

    return NextResponse.json({
      success: true,
      message: 'Profil employé mis à jour',
      employee,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { user, error, status } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status });

  try {
    await prisma.employee.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: 'Profil employé supprimé' });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
