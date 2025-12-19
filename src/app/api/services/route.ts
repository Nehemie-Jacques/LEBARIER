import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createServiceSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  duration: z.number().positive(),
  category: z.string(),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    const stats = {
      total: services.length,
      byCategory: services.reduce((acc: any, service) => {
        acc[service.category] = (acc[service.category] || 0) + 1;
        return acc;
      }, {}),
    };

    return NextResponse.json({ success: true, count: services.length, stats, services });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { user, error, status } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status });

  try {
    const body = await req.json();
    const data = createServiceSchema.parse(body);

    const service = await prisma.service.create({ data });

    return NextResponse.json({
      success: true,
      message: 'Service créé',
      service,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Données invalides', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
