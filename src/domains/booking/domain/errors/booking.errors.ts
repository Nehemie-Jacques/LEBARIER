// ============================================
// BOOKING DOMAIN - Booking Domain Errors
// ============================================

import { DomainError } from '@/shared/errors/base.error';

export class AppointmentNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Appointment with ID '${id}' not found`, 'APPOINTMENT_NOT_FOUND', 404);
  }
}

export class SlotNotAvailableError extends DomainError {
  constructor(message: string = 'Time slot is not available') {
    super(message, 'SLOT_NOT_AVAILABLE', 409);
  }
}

export class CancellationNotAllowedError extends DomainError {
  constructor(reason: string) {
    super(reason, 'CANCELLATION_NOT_ALLOWED', 403);
  }
}

export class InvalidAppointmentDateError extends DomainError {
  constructor(message: string = 'Invalid appointment date') {
    super(message, 'INVALID_APPOINTMENT_DATE', 400);
  }
}

export class EmployeeNotAvailableError extends DomainError {
  constructor(employeeId: string, date: Date) {
    super(
      `Employee ${employeeId} is not available on ${date.toISOString()}`,
      'EMPLOYEE_NOT_AVAILABLE',
      409
    );
  }
}
