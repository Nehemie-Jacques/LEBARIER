import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/auth-helpers';
import { z } from 'zod';

// Simple schema for sending an email notification
const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  metadata: z.record(z.any()).optional(),
});

// GET /api/notifications/email - list sent emails (admin) or user's email logs
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
    // Admin can filter by userId or recipient
    const userId = searchParams.get('userId');
    const recipient = searchParams.get('to');
    if (isAdmin && userId) where.userId = userId;
    if (recipient) where.to = { contains: recipient, mode: 'insensitive' };

    // If not admin, only show logs related to the authenticated user's email
    if (!isAdmin) {
      where.to = user?.email;
    }

    const [items, total] = await Promise.all([
      prisma.notification.findMany({ where: { ...where, channel: 'EMAIL' }, orderBy: { createdAt: 'desc' }, take: limit, skip }),
      prisma.notification.count({ where: { ...where, channel: 'EMAIL' } }),
    ]);

    return NextResponse.json({
      success: true,
      items,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err: any) {
    console.error('GET /api/notifications/email error', err);
    return NextResponse.json({ error: 'Erreur serveur', details: err.message }, { status: 500 });
  }
}

// POST /api/notifications/email - send an email (admin or system)
export async function POST(req: NextRequest) {
  try {
    const { user, error, status } = await requireAuth();
    if (error) return NextResponse.json({ error }, { status });

    const body = await req.json();
    const data = sendEmailSchema.parse(body);

    // Here we only persist the email notification. Integration with real email provider (SendGrid, Mailgun...) is out of scope.
    const record = await prisma.notification.create({
      data: {
        userId: user!.id,
        type: 'SYSTEM',
        channel: 'EMAIL',
        title: data.subject,
        message: data.body,
        data: { to: data.to, metadata: data.metadata || {} },
        sentAt: new Date(),
      },
    });

    // Optionally: enqueue sending via background job or call provider API here.

    return NextResponse.json({ success: true, notification: record, message: 'Email enregistré (et envoyé si provider configuré)' }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/notifications/email error', err);
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Données invalides', details: err.errors }, { status: 400 });
    return NextResponse.json({ error: 'Erreur serveur', details: err.message }, { status: 500 });
  }
}
