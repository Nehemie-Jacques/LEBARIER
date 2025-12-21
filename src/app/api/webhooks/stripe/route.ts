import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Basic Stripe webhook receiver (no stripe SDK dependency)
// This is a safe, minimal handler: will parse the incoming event and update Payment records when possible.

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    let body: any;
    try { body = JSON.parse(raw); } catch (e) { body = raw; }

    // prefer structured event (Stripe usually sends {type, data})
    const event = body;

    // Very small validation
    if (!event || !event.type) {
      console.warn('webhooks/stripe: missing event.type');
      return NextResponse.json({ success: false, error: 'Invalid event' }, { status: 400 });
    }

    // Example: handle payment_intent.succeeded / charge.succeeded
    const type: string = event.type;
    const dataObj = event.data?.object || event.data || {};

    if (type.includes('payment_intent') || type.includes('charge')) {
      const transactionId = dataObj.id || dataObj.charges?.data?.[0]?.id;
      const status = type.includes('succeeded') ? 'PAID' : (type.includes('failed') ? 'FAILED' : undefined);

      if (transactionId && status) {
        // try to update payment by transactionId
        const payment = await prisma.payment.findUnique({ where: { transactionId } });
        if (payment) {
          await prisma.payment.update({ where: { id: payment.id }, data: { status: status as any, transactionId } });
        } else {
          // try to find by orderId if provided
          const orderId = dataObj.metadata?.orderId || dataObj.order_id || dataObj.metadata?.order_id;
          if (orderId) {
            await prisma.payment.create({ data: { orderId, transactionId, amount: dataObj.amount_received ? dataObj.amount_received / 100 : (dataObj.amount || 0), method: 'CARD', status: status as any, paidAt: status === 'PAID' ? new Date() : undefined } });
          }
        }
      }
    }

    // generic record in notifications for admin review
    await prisma.notification.create({
      data: {
        userId: (process.env.SYSTEM_USER_ID as string) || '',
        type: 'SYSTEM',
        channel: 'IN_APP',
        title: `Stripe webhook: ${event.type}`,
        message: JSON.stringify({ type: event.type, summary: dataObj?.id || dataObj }),
        data: { raw: event },
        sentAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('webhooks/stripe error', err);
    return NextResponse.json({ success: false, error: err.message || 'server error' }, { status: 500 });
  }
}
