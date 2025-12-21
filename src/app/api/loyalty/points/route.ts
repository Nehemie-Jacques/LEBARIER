import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';

// Helper to compute user points balance
async function computePointsBalance(userId: string) {
  const transactions = await prisma.loyaltyTransaction.findMany({ where: { userId } });
  let balance = 0;
  for (const t of transactions) {
    if (t.type === 'EARN' || t.type === 'BONUS' || t.type === 'REFUND') balance += t.points;
    else if (t.type === 'REDEEM' || t.type === 'EXPIRE') balance -= t.points;
  }
  return { balance, transactionsCount: transactions.length };
}

const awardSchema = z.object({
  userId: z.string(),
  points: z.number().int().positive(),
  type: z.enum(['EARN', 'BONUS']).default('EARN'),
  reason: z.string().optional(),
  reference: z.string().optional(),
  expiresAt: z.string().optional(), // ISO date
});

const redeemSchema = z.object({
  points: z.number().int().positive(),
  reason: z.string().optional(),
  reference: z.string().optional(),
});

// GET /api/loyalty/points - get balance and transactions (user or admin)
export async function GET(req: NextRequest) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) return NextResponse.json({ error }, { status });

    const { searchParams } = new URL(req.url);
    const userIdParam = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const isAdmin = user?.role === 'ADMIN';
    const targetUserId = isAdmin && userIdParam ? userIdParam : user!.id;

    const { balance } = await computePointsBalance(targetUserId);

    const transactions = await prisma.loyaltyTransaction.findMany({
      where: { userId: targetUserId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    });

    const total = await prisma.loyaltyTransaction.count({ where: { userId: targetUserId } });

    return NextResponse.json({ success: true, userId: targetUserId, balance, transactions, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (err: any) {
    console.error('GET /api/loyalty/points error', err);
    return NextResponse.json({ error: 'Erreur serveur', details: err.message }, { status: 500 });
  }
}

// POST /api/loyalty/points - award points (admin or system)
export async function POST(req: NextRequest) {
  try {
    // Only admin or system should award points
    const { error: adminError, status: adminStatus } = await requireAdmin();
    if (adminError) return NextResponse.json({ error: adminError }, { status: adminStatus });

    const body = await req.json();
    const data = awardSchema.parse(body);

    const tx = await prisma.loyaltyTransaction.create({
      data: {
        userId: data.userId,
        points: data.points,
        type: data.type as any,
        reason: data.reason || 'Awarded points',
        reference: data.reference,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
      },
    });

    return NextResponse.json({ success: true, transaction: tx, message: 'Points attribués' }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/loyalty/points error', err);
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Données invalides', details: err.errors }, { status: 400 });
    return NextResponse.json({ error: 'Erreur serveur', details: err.message }, { status: 500 });
  }
}

// PUT /api/loyalty/points - redeem points (user or admin)
export async function PUT(req: NextRequest) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) return NextResponse.json({ error }, { status });

    const body = await req.json();
    const data = redeemSchema.parse(body);

    const targetUserId = user!.id;
    // compute current balance
    const { balance } = await computePointsBalance(targetUserId);
    if (data.points > balance) return NextResponse.json({ error: 'Points insuffisants' }, { status: 400 });

    const tx = await prisma.loyaltyTransaction.create({
      data: {
        userId: targetUserId,
        points: data.points,
        type: 'REDEEM',
        reason: data.reason || 'Redemption',
        reference: data.reference,
      },
    });

    return NextResponse.json({ success: true, transaction: tx, message: 'Points retirés' });
  } catch (err: any) {
    console.error('PUT /api/loyalty/points error', err);
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Données invalides', details: err.errors }, { status: 400 });
    return NextResponse.json({ error: 'Erreur serveur', details: err.message }, { status: 500 });
  }
}
