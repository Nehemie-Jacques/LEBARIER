import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';

const createRewardSchema = z.object({
  tier: z.string(),
  name: z.string(),
  nameEn: z.string().optional(),
  description: z.string().min(1),
  pointsCost: z.number().int().nonnegative(),
  discount: z.number().optional(),
  isActive: z.boolean().optional(),
});

const updateRewardSchema = createRewardSchema.partial();

// GET /api/loyalty/rewards - public list of rewards (active only by default)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get('active') !== 'false';
    const tier = searchParams.get('tier');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (activeOnly) where.isActive = true;
    if (tier) where.tier = tier;

    const [items, total] = await Promise.all([
      prisma.loyaltyReward.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit, skip }),
      prisma.loyaltyReward.count({ where }),
    ]);

    return NextResponse.json({ success: true, items, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (err: any) {
    console.error('GET /api/loyalty/rewards error', err);
    return NextResponse.json({ error: 'Erreur serveur', details: err.message }, { status: 500 });
  }
}

// POST /api/loyalty/rewards - create reward (admin)
export async function POST(req: NextRequest) {
  try {
    const { error: adminError, status: adminStatus } = await requireAdmin();
    if (adminError) return NextResponse.json({ error: adminError }, { status: adminStatus });

    const body = await req.json();
    const data = createRewardSchema.parse(body);

    const reward = await prisma.loyaltyReward.create({ data: {
      tier: data.tier as any,
      name: data.name,
      nameEn: data.nameEn || data.name,
      description: data.description,
      pointsCost: data.pointsCost,
      discount: data.discount,
      isActive: data.isActive ?? true,
    }});

    return NextResponse.json({ success: true, reward, message: 'Reward created' }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/loyalty/rewards error', err);
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Données invalides', details: err.errors }, { status: 400 });
    return NextResponse.json({ error: 'Erreur serveur', details: err.message }, { status: 500 });
  }
}

// PUT /api/loyalty/rewards - update reward (admin)
export async function PUT(req: NextRequest) {
  try {
    const { error: adminError, status: adminStatus } = await requireAdmin();
    if (adminError) return NextResponse.json({ error: adminError }, { status: adminStatus });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id query param required' }, { status: 400 });

    const body = await req.json();
    const data = updateRewardSchema.parse(body);

  const updateData: any = {};
  if (data.tier !== undefined) updateData.tier = data.tier as any;
  if (data.name !== undefined) updateData.name = data.name;
  if (data.nameEn !== undefined) updateData.nameEn = data.nameEn;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.pointsCost !== undefined) updateData.pointsCost = data.pointsCost;
  if (data.discount !== undefined) updateData.discount = data.discount;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;

  const reward = await prisma.loyaltyReward.update({ where: { id }, data: updateData });

    return NextResponse.json({ success: true, reward, message: 'Reward updated' });
  } catch (err: any) {
    console.error('PUT /api/loyalty/rewards error', err);
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Données invalides', details: err.errors }, { status: 400 });
    return NextResponse.json({ error: 'Erreur serveur', details: err.message }, { status: 500 });
  }
}

// DELETE /api/loyalty/rewards - delete reward (admin)
export async function DELETE(req: NextRequest) {
  try {
    const { error: adminError, status: adminStatus } = await requireAdmin();
    if (adminError) return NextResponse.json({ error: adminError }, { status: adminStatus });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id query param required' }, { status: 400 });

    await prisma.loyaltyReward.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Reward deleted' });
  } catch (err: any) {
    console.error('DELETE /api/loyalty/rewards error', err);
    return NextResponse.json({ error: 'Erreur serveur', details: err.message }, { status: 500 });
  }
}
