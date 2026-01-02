// ============================================
// BOOKING DOMAIN - Cancel Appointment Use Case
// ============================================

import type { IUseCase, Result } from '@/shared/types/common.types';
import { success, failure } from '@/shared/types/common.types';
import type { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';
import type { IEventBus } from '@/shared/events/event-bus';
import { AppointmentNotFoundError, CancellationNotAllowedError } from '../../domain/errors/booking.errors';
import { AppointmentCancelledEvent } from '../events/appointment-cancelled.event';

export interface CancelAppointmentDTO {
  appointmentId: string;
  userId: string; // To ensure user can only cancel their own appointments
  reason?: string;
}

interface Dependencies {
  appointmentRepository: IAppointmentRepository;
  eventBus: IEventBus;
}

export class CancelAppointmentUseCase
  implements IUseCase<CancelAppointmentDTO, void>
{
  constructor(private deps: Dependencies) {}

  async execute(dto: CancelAppointmentDTO): Promise<Result<void>> {
    try {
      // 1. Find appointment
      const appointment = await this.deps.appointmentRepository.findById(dto.appointmentId);
      
      if (!appointment) {
        return failure(new AppointmentNotFoundError(dto.appointmentId));
      }

      // 2. Verify ownership
      if (appointment.userId !== dto.userId) {
        return failure(new CancellationNotAllowedError('You can only cancel your own appointments'));
      }

      // 3. Check if cancellation is allowed (business rule)
      if (!appointment.isCancellable()) {
        return failure(
          new CancellationNotAllowedError(
            'Appointments can only be cancelled at least 2 hours before the scheduled time'
          )
        );
      }

      // 4. Cancel appointment (domain logic)
      appointment.cancel(dto.reason);

      // 5. Persist
      await this.deps.appointmentRepository.update(appointment);

      // 6. Publish event
      const event = new AppointmentCancelledEvent(appointment.id, {
        appointmentId: appointment.id,
        userId: appointment.userId,
        employeeId: appointment.employeeId,
        date: appointment.date.toISOString(),
        reason: dto.reason,
      });
      await this.deps.eventBus.publish(event);

      return success(undefined);
    } catch (error) {
      return failure(error as Error);
    }
  }
}
