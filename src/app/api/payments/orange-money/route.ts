import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-helpers';
import { z } from 'zod';

const createOrangeSchema = z.object({
  orderId: z.string().optional(),
  amount: z.number().positive(),
  phone: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) return NextResponse.json({ error }, { status });

    const body = await req.json();
    const data = createOrangeSchema.parse(body);

    // Placeholder: create payment record and return a redirect or payment token
    const payment = await prisma.payment.create({ data: { amount: data.amount, method: 'ORANGE_MONEY', status: 'PENDING', orderId: data.orderId, transactionId: `orange_stub_${Date.now()}` } });

    // In real integration, return provider payment url or token
    return NextResponse.json({ success: true, payment, paymentUrl: `https://orange.money/pay_stub/${payment.id}` }, { status: 201 });
  } catch (err: any) {
    console.error('payments/orange-money POST error', err);
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 });
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}
