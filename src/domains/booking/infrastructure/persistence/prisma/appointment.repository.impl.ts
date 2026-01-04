// ============================================
// BOOKING DOMAIN - Prisma Appointment Repository Implementation
// ============================================

import type { IAppointmentRepository } from '../../../domain';
import type { PaginatedResponse, PaginationParams } from '@/shared/types/common.types';
import { Appointment, TimeSlot } from '../../../domain';
import { AppointmentStatus } from '@prisma/client';
import prisma from '@/shared/database/prisma.client';
import { AppointmentMapper } from '../mappers/appointment.mapper';
import { startOfDay, endOfDay, subHours } from 'date-fns';

export class PrismaAppointmentRepository implements IAppointmentRepository {
  async findById(id: string): Promise<Appointment | null> {
    const data = await prisma.appointment.findUnique({
      where: { id },
    });

    return data ? AppointmentMapper.toDomain(data) : null;
  }

  async save(appointment: Appointment): Promise<Appointment> {
    const data = AppointmentMapper.toPersistence(appointment);
    
    const saved = await prisma.appointment.create({
      data,
    });

    return AppointmentMapper.toDomain(saved);
  }

  async update(appointment: Appointment): Promise<Appointment> {
    const data = AppointmentMapper.toPersistence(appointment);
    const { id, ...updateData } = data;

    const updated = await prisma.appointment.update({
      where: { id },
      data: updateData,
    });

    return AppointmentMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.appointment.delete({
      where: { id },
    });
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResponse<Appointment>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        skip,
        take: limit,
        orderBy: params?.sortBy
          ? { [params.sortBy]: params.sortOrder || 'asc' }
          : { createdAt: 'desc' },
      }),
      prisma.appointment.count(),
    ]);

    return {
      data: appointments.map(AppointmentMapper.toDomain),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async findByUserId(
    userId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Appointment>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { date: 'desc' },
      }),
      prisma.appointment.count({ where: { userId } }),
    ]);

    return {
      data: appointments.map(AppointmentMapper.toDomain),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async findByEmployeeId(
    employeeId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Appointment>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where: { employeeId },
        skip,
        take: limit,
        orderBy: { date: 'desc' },
      }),
      prisma.appointment.count({ where: { employeeId } }),
    ]);

    return {
      data: appointments.map(AppointmentMapper.toDomain),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async findByDateRange(start: Date, end: Date): Promise<Appointment[]> {
    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { date: 'asc' },
    });

    return appointments.map(AppointmentMapper.toDomain);
  }

  async findByEmployeeAndDate(employeeId: string, date: Date): Promise<Appointment[]> {
    const appointments = await prisma.appointment.findMany({
      where: {
        employeeId,
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
      orderBy: { date: 'asc' },
    });

    return appointments.map(AppointmentMapper.toDomain);
  }

  async findByStatus(
    status: AppointmentStatus,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Appointment>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where: { status },
        skip,
        take: limit,
        orderBy: { date: 'desc' },
      }),
      prisma.appointment.count({ where: { status } }),
    ]);

    return {
      data: appointments.map(AppointmentMapper.toDomain),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async checkConflicts(employeeId: string, timeSlot: TimeSlot): Promise<boolean> {
    const conflictingAppointments = await prisma.appointment.findMany({
      where: {
        employeeId,
        status: {
          in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED, AppointmentStatus.IN_PROGRESS],
        },
        date: {
          lt: timeSlot.end,
        },
        endTime: {
          gt: timeSlot.start,
        },
      },
    });

    return conflictingAppointments.length > 0;
  }

  async getEmployeeAppointmentsForDay(employeeId: string, date: Date): Promise<Appointment[]> {
    return this.findByEmployeeAndDate(employeeId, date);
  }

  async findAppointmentsNeedingReminder24h(): Promise<Appointment[]> {
    const targetTime = subHours(new Date(), -24); // 24 hours from now
    const endWindow = subHours(targetTime, -1); // 1-hour window

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: targetTime,
          lte: endWindow,
        },
        status: AppointmentStatus.CONFIRMED,
        reminderSent24h: false,
      },
    });

    return appointments.map(AppointmentMapper.toDomain);
  }

  async findAppointmentsNeedingReminder2h(): Promise<Appointment[]> {
    const targetTime = subHours(new Date(), -2); // 2 hours from now
    const endWindow = subHours(targetTime, -0.5); // 30-minute window

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: targetTime,
          lte: endWindow,
        },
        status: AppointmentStatus.CONFIRMED,
        reminderSent2h: false,
      },
    });

    return appointments.map(AppointmentMapper.toDomain);
  }

  async countByStatus(status: AppointmentStatus): Promise<number> {
    return prisma.appointment.count({
      where: { status },
    });
  }

  async countByEmployeeAndDateRange(
    employeeId: string,
    start: Date,
    end: Date
  ): Promise<number> {
    return prisma.appointment.count({
      where: {
        employeeId,
        date: {
          gte: start,
          lte: end,
        },
      },
    });
  }
}
