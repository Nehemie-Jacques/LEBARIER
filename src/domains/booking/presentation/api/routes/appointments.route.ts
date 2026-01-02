// ============================================
// BOOKING API - Appointments Route
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { PrismaAppointmentRepository } from '@/domains/booking/infrastructure/persistence/prisma/appointment.repository.impl';
import { CreateAppointmentUseCase } from '@/domains/booking/application/use-cases/create-appointment.use-case';
import { createAppointmentSchema } from '@/domains/booking/application/dto/create-appointment.dto';
import { eventBus } from '@/shared/events/event-bus';
import prisma from '@/shared/database/prisma.client';
import { auth } from '@/lib/auth';

/**
 * GET /api/appointments
 * List user appointments
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const repository = new PrismaAppointmentRepository();
    const result = await repository.findByUserId(session.user.id, { page, limit });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/appointments
 * Create new appointment
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Validate request body
    const validatedData = createAppointmentSchema.parse({
      ...body,
      userId: session.user.id, // Force userId from session
    });

    // Initialize dependencies
    const repository = new PrismaAppointmentRepository();
    
    const getServiceById = async (id: string) => {
      const service = await prisma.service.findUnique({
        where: { id },
        select: { duration: true, price: true },
      });
      
      if (!service) {
        throw new Error('Service not found');
      }
      
      return service;
    };

    const getEmployeeById = async (id: string) => {
      const employee = await prisma.employee.findUnique({
        where: { id },
        include: { user: { select: { firstName: true, lastName: true } } },
      });
      
      if (!employee) {
        throw new Error('Employee not found');
      }
      
      return {
        id: employee.id,
        name: `${employee.user.firstName} ${employee.user.lastName}`,
      };
    };

    // Execute use case
    const useCase = new CreateAppointmentUseCase({
      appointmentRepository: repository,
      eventBus,
      getServiceById,
      getEmployeeById,
    });

    const result = await useCase.execute(validatedData);

    if (!result.success) {
      const error = result.error;
      return NextResponse.json(
        { error: error.message },
        { status: (error as any).statusCode || 500 }
      );
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
