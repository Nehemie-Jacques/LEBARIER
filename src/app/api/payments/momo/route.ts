import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-helpers';
import { z } from 'zod';

const createMomoSchema = z.object({
  orderId: z.string().optional(),
  amount: z.number().positive(),
  phone: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) return NextResponse.json({ error }, { status });

    const body = await req.json();
    const data = createMomoSchema.parse(body);

    const payment = await prisma.payment.create({ data: { amount: data.amount, method: 'MOMO', status: 'PENDING', orderId: data.orderId, transactionId: `momo_stub_${Date.now()}` } });

    return NextResponse.json({ success: true, payment, paymentUrl: `https://momo.pay/stub/${payment.id}` }, { status: 201 });
  } catch (err: any) {
    console.error('payments/momo POST error', err);
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 });
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}
