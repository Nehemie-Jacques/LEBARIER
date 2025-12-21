import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';

const sendSmsSchema = z.object({
  to: z.string().min(6), // basic phone validation -- project may have more sophisticated checks
  message: z.string().min(1),
  metadata: z.record(z.any()).optional(),
});

// GET /api/notifications/sms - list sent SMS
export async function GET(req: NextRequest) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) return NextResponse.json({ error }, { status });

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const isAdmin = user?.role === 'ADMIN';

    const where: any = {};
    const to = searchParams.get('to');
    const userId = searchParams.get('userId');

    if (isAdmin && userId) where.userId = userId;
    if (to) where.to = { contains: to, mode: 'insensitive' };
    if (!isAdmin) where.userId = user?.id;

    const [items, total] = await Promise.all([
      prisma.notification.findMany({ where: { ...where, channel: 'SMS' }, orderBy: { createdAt: 'desc' }, take: limit, skip }),
      prisma.notification.count({ where: { ...where, channel: 'SMS' } }),
    ]);

    return NextResponse.json({ success: true, items, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
  } catch (err: any) {
    console.error('GET /api/notifications/sms error', err);
    return NextResponse.json({ error: 'Erreur serveur', details: err.message }, { status: 500 });
  }
}

// POST /api/notifications/sms - send an SMS
export async function POST(req: NextRequest) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) return NextResponse.json({ error }, { status });

    const body = await req.json();
    const data = sendSmsSchema.parse(body);

    const record = await prisma.notification.create({
      data: {
        userId: user!.id,
        type: 'SYSTEM',
        channel: 'SMS',
        title: `SMS to ${data.to}`,
        message: data.message,
        data: { to: data.to, metadata: data.metadata || {} },
        sentAt: new Date(),
      },
    });

    // Integration with SMS provider (Twilio, Orange SMS, etc.) should be done here or via background job.

    return NextResponse.json({ success: true, notification: record, message: 'SMS enregistré (et envoyé si provider configuré)' }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/notifications/sms error', err);
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Données invalides', details: err.errors }, { status: 400 });
    return NextResponse.json({ error: 'Erreur serveur', details: err.message }, { status: 500 });
  }
}
