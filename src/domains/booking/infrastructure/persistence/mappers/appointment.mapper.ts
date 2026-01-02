// ============================================
// BOOKING DOMAIN - Appointment Mapper
// ============================================

import type { Appointment as PrismaAppointment } from '@prisma/client';
import { Appointment } from '../../domain/entities/appointment.entity';

/**
 * Mapper between Prisma model and Domain entity
 */
export class AppointmentMapper {
  /**
   * Convert Prisma model to Domain entity
   */
  static toDomain(prisma: PrismaAppointment): Appointment {
    return Appointment.fromPersistence({
      id: prisma.id,
      userId: prisma.userId,
      employeeId: prisma.employeeId,
      serviceId: prisma.serviceId,
      date: prisma.date,
      endTime: prisma.endTime,
      location: prisma.location,
      addressId: prisma.addressId || undefined,
      customAddress: prisma.customAddress || undefined,
      lat: prisma.lat || undefined,
      lng: prisma.lng || undefined,
      status: prisma.status,
      servicePrice: prisma.servicePrice,
      travelFee: prisma.travelFee,
      totalPrice: prisma.totalPrice,
      notes: prisma.notes || undefined,
      reminderSent24h: prisma.reminderSent24h,
      reminderSent2h: prisma.reminderSent2h,
      cancellationReason: prisma.cancellationReason || undefined,
      cancelledAt: prisma.cancelledAt || undefined,
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
    });
  }

  /**
   * Convert Domain entity to Prisma model data
   */
  static toPersistence(domain: Appointment): any {
    const props = domain.toObject();
    
    return {
      id: props.id || undefined,
      userId: props.userId,
      employeeId: props.employeeId,
      serviceId: props.serviceId,
      date: props.date,
      endTime: props.endTime,
      location: props.location,
      addressId: props.addressId || null,
      customAddress: props.customAddress || null,
      lat: props.lat || null,
      lng: props.lng || null,
      status: props.status,
      servicePrice: props.servicePrice,
      travelFee: props.travelFee,
      totalPrice: props.totalPrice,
      notes: props.notes || null,
      reminderSent24h: props.reminderSent24h,
      reminderSent2h: props.reminderSent2h,
      cancellationReason: props.cancellationReason || null,
      cancelledAt: props.cancelledAt || null,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }
}
