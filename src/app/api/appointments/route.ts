/**
 * ============================================
 * 📅 API APPOINTMENTS - LE BARBIER
 * ============================================
 * 
 * CRUD complet pour les rendez-vous
 * Accessible aux utilisateurs authentifiés
 */

import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createAppointmentSchema = z.object({
  employeeId: z.string().cuid(),
  serviceId: z.string().cuid(),
  date: z.string().datetime(),
  endTime: z.string().datetime(),
  location: z.enum(['SALON', 'HOME']).default('SALON'),
  addressId: z.string().cuid().optional(),
  customAddress: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  notes: z.string().optional(),
});

export async function GET(req: Request) {
  const { user, error, status } = await requireAuth();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {
      userId: user!.id,
    };

    if (statusFilter) {
      where.status = statusFilter;
    }

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      where.date = {
        gte: new Date(startDate),
      };
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        employee: {
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
            specialties: true,
          },
        },
        service: true,
        address: true,
        payment: true,
        review: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    const stats = {
      total: appointments.length,
      byStatus: {
        PENDING: appointments.filter((a) => a.status === 'PENDING').length,
        CONFIRMED: appointments.filter((a) => a.status === 'CONFIRMED').length,
        IN_PROGRESS: appointments.filter((a) => a.status === 'IN_PROGRESS').length,
        COMPLETED: appointments.filter((a) => a.status === 'COMPLETED').length,
        CANCELLED: appointments.filter((a) => a.status === 'CANCELLED').length,
      },
    };

    return NextResponse.json({
      success: true,
      count: appointments.length,
      stats,
      appointments,
    });
  } catch (error) {
    console.error('🚨 Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { user, error, status } = await requireAuth();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const body = await req.json();
    const validatedData = createAppointmentSchema.parse(body);

    const service = await prisma.service.findUnique({
      where: { id: validatedData.serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }

    const employee = await prisma.employee.findUnique({
      where: { id: validatedData.employeeId },
    });

    if (!employee) {
      return NextResponse.json({ error: 'Employé non trouvé' }, { status: 404 });
    }

    const servicePrice = service.price;
    const travelFee = validatedData.location === 'HOME' ? 5000 : 0;
    const totalPrice = servicePrice + travelFee;

    const appointment = await prisma.appointment.create({
      data: {
        userId: user!.id,
        employeeId: validatedData.employeeId,
        serviceId: validatedData.serviceId,
        date: new Date(validatedData.date),
        endTime: new Date(validatedData.endTime),
        location: validatedData.location,
        addressId: validatedData.addressId,
        customAddress: validatedData.customAddress,
        lat: validatedData.lat,
        lng: validatedData.lng,
        notes: validatedData.notes,
        servicePrice,
        travelFee,
        totalPrice,
        status: 'PENDING',
      },
      include: {
        employee: {
          select: {
            id: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        service: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Rendez-vous créé',
      appointment,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Données invalides', details: error.errors }, { status: 400 });
    }
    console.error('🚨 Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
