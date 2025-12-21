import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Basic SendGrid webhook receiver (inbound or event webhooks)
// This handler records incoming events as Notifications for later processing.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // SendGrid may POST an array of events
    const events = Array.isArray(body) ? body : [body];

    for (const ev of events) {
      const to = ev.email || ev.to || ev.recipient || ev.msg?.to;
      const subject = ev.subject || ev.msg?.subject || `sendgrid:${ev.event}`;
      await prisma.notification.create({
        data: {
          userId: (process.env.SYSTEM_USER_ID as string) || '',
          type: 'SYSTEM',
          channel: 'EMAIL',
          title: subject,
          message: JSON.stringify(ev),
          data: { event: ev },
          sentAt: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('webhooks/sendgrid error', err);
    return NextResponse.json({ success: false, error: err.message || 'server error' }, { status: 500 });
  }
}
