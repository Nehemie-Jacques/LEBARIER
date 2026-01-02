// ============================================
// BOOKING DOMAIN - Appointment Cancelled Event
// ============================================

import { DomainEvent } from '@/shared/events/domain-event';

export interface AppointmentCancelledEventData {
  appointmentId: string;
  userId: string;
  employeeId: string;
  date: string; // ISO string
  reason?: string;
}

export class AppointmentCancelledEvent extends DomainEvent<AppointmentCancelledEventData> {
  constructor(aggregateId: string, data: AppointmentCancelledEventData) {
    super('APPOINTMENT_CANCELLED', aggregateId, data);
  }
}
