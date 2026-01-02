// ============================================
// BOOKING DOMAIN - Appointment Created Event
// ============================================

import { DomainEvent } from '@/shared/events/domain-event';

export interface AppointmentCreatedEventData {
  appointmentId: string;
  userId: string;
  employeeId: string;
  serviceId: string;
  date: string; // ISO string
  totalPrice: number;
}

export class AppointmentCreatedEvent extends DomainEvent<AppointmentCreatedEventData> {
  constructor(aggregateId: string, data: AppointmentCreatedEventData) {
    super('APPOINTMENT_CREATED', aggregateId, data);
  }
}
