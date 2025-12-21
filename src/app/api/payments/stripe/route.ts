import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth-helpers';
import { z } from 'zod';

const createIntentSchema = z.object({
  orderId: z.string().optional(),
  amount: z.number().positive().optional(),
  currency: z.string().default('XAF'),
});

// POST /api/payments/stripe - create a placeholder payment record and return a client-side token stub
export async function POST(req: NextRequest) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) return NextResponse.json({ error }, { status });

    const body = await req.json();
    const data = createIntentSchema.parse(body);

    // If STRIPE is configured, the integration would call Stripe SDK here.
    // For now, create a Payment record with status PENDING and return a placeholder clientSecret.

    const payment = await prisma.payment.create({
      data: {
        amount: data.amount || 0,
        method: 'CARD',
        status: 'PENDING',
        transactionId: `stripe_stub_${Date.now()}`,
        orderId: data.orderId,
      },
    });

    return NextResponse.json({ success: true, payment, clientSecret: `cs_stub_${payment.id}` }, { status: 201 });
  } catch (err: any) {
    console.error('payments/stripe POST error', err);
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 });
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}
