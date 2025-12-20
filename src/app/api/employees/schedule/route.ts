import { NextResponse } from 'next/server';
import { requireEmployee } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const availabilitySchema = z.object({
  employeeId: z.string().cuid(),
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  isActive: z.boolean().default(true),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get('employeeId');

    if (!employeeId) {
      return NextResponse.json({ error: 'employeeId requis' }, { status: 400 });
    }

    const availabilities = await prisma.availability.findMany({
      where: { employeeId },
      orderBy: { dayOfWeek: 'asc' },
    });

    const daysOfWeek = [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ];

    const schedule = availabilities.map((avail) => ({
      ...avail,
      dayName: daysOfWeek[avail.dayOfWeek],
    }));

    return NextResponse.json({
      success: true,
      employeeId,
      schedule,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { user, error, status } = await requireEmployee();
  if (error) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const data = availabilitySchema.parse(body);

    const employee = await prisma.employee.findUnique({
      where: { id: data.employeeId },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Employé introuvable' }, { status: 404 });
    }

    if (user && user.role === 'EMPLOYEE' && employee.userId !== user.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const existing = await prisma.availability.findFirst({
      where: {
        employeeId: data.employeeId,
        dayOfWeek: data.dayOfWeek,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Disponibilité existe déjà pour ce jour' },
        { status: 400 }
      );
    }

    const availability = await prisma.availability.create({
      data,
    });

    return NextResponse.json(
      { success: true, message: 'Disponibilité ajoutée', availability },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { user, error, status } = await requireEmployee();
  if (error) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    const availability = await prisma.availability.findUnique({
      where: { id },
      include: { employee: true },
    });

    if (!availability) {
      return NextResponse.json({ error: 'Disponibilité introuvable' }, { status: 404 });
    }

    if (user && user.role === 'EMPLOYEE' && availability.employee.userId !== user.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const updated = await prisma.availability.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      message: 'Disponibilité mise à jour',
      availability: updated,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { user, error, status } = await requireEmployee();
  if (error) return NextResponse.json({ error }, { status });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    const availability = await prisma.availability.findUnique({
      where: { id },
      include: { employee: true },
    });

    if (!availability) {
      return NextResponse.json({ error: 'Disponibilité introuvable' }, { status: 404 });
    }

    if (user && user.role === 'EMPLOYEE' && availability.employee.userId !== user.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    await prisma.availability.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: 'Disponibilité supprimée',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
