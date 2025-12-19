import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  notes: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { user, error, status } = await requireAuth();
  if (error) return NextResponse.json({ error }, { status });

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
      include: {
        employee: { select: { id: true, user: { select: { firstName: true, lastName: true } } } },
        service: true,
        user: { select: { firstName: true, lastName: true } },
      },
    });

    if (!appointment) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });

    const canAccess = appointment.userId === user!.id || (user as any).role === 'ADMIN';
    if (!canAccess) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { user, error, status } = await requireAuth();
  if (error) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    const existing = await prisma.appointment.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });

    const canModify = existing.userId === user!.id || (user as any).role === 'ADMIN';
    if (!canModify) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });

    const updateData: any = {};
    if (data.status) {
      updateData.status = data.status;
      if (data.status === 'CANCELLED') {
        updateData.cancelledAt = new Date();
        if (data.cancellationReason) updateData.cancellationReason = data.cancellationReason;
      }
    }
    if (data.notes !== undefined) updateData.notes = data.notes;

    const updated = await prisma.appointment.update({
      where: { id: params.id },
      data: updateData,
      include: { employee: true, service: true },
    });

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { user, error, status } = await requireAuth();
  if (error) return NextResponse.json({ error }, { status });

  try {
    const appointment = await prisma.appointment.findUnique({ where: { id: params.id } });
    if (!appointment) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });

    const canDelete = appointment.userId === user!.id || (user as any).role === 'ADMIN';
    if (!canDelete) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });

    await prisma.appointment.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: 'Supprimé' });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
