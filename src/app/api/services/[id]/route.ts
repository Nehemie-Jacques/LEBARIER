import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateServiceSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  category: z.string().optional(),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
    });

    if (!service) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { user, error, status } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const data = updateServiceSchema.parse(body);

    const service = await prisma.service.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ success: true, message: 'Service mis à jour', service });
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
    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: 'Service supprimé' });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
