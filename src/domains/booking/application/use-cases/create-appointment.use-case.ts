// ============================================
// BOOKING DOMAIN - Create Appointment Use Case
// ============================================

import type { IUseCase, Result } from '@/shared/types/common.types';
import { success, failure } from '@/shared/types/common.types';
import type { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';
import type { IEventBus } from '@/shared/events/event-bus';
import { Appointment } from '../../domain/entities/appointment.entity';
import { TimeSlot } from '../../domain/value-objects/time-slot.vo';
import { AppointmentStatus, LocationType } from '@prisma/client';
import type { CreateAppointmentDTO } from '../dto/create-appointment.dto';
import type { AppointmentResponseDTO } from '../dto/appointment-response.dto';
import { SlotNotAvailableError, InvalidAppointmentDateError } from '../../domain/errors/booking.errors';
import { AppointmentCreatedEvent } from '../events/appointment-created.event';

interface Dependencies {
  appointmentRepository: IAppointmentRepository;
  eventBus: IEventBus;
  // We'll inject these to fetch service details
  getServiceById: (id: string) => Promise<{ duration: number; price: number }>;
  getEmployeeById: (id: string) => Promise<{ id: string; name: string }>;
}

export class CreateAppointmentUseCase
  implements IUseCase<CreateAppointmentDTO, AppointmentResponseDTO>
{
  constructor(private deps: Dependencies) {}

  async execute(dto: CreateAppointmentDTO): Promise<Result<AppointmentResponseDTO>> {
    try {
      // 1. Validate appointment date is in the future
      const now = new Date();
      if (dto.date <= now) {
        return failure(new InvalidAppointmentDateError('Appointment date must be in the future'));
      }

      // 2. Get service details (duration, price)
      const service = await this.deps.getServiceById(dto.serviceId);
      const endTime = new Date(dto.date.getTime() + service.duration * 60000);
      const timeSlot = TimeSlot.create(dto.date, endTime);

      // 3. Check availability - no conflicts with existing appointments
      const hasConflicts = await this.deps.appointmentRepository.checkConflicts(
        dto.employeeId,
        timeSlot
      );

      if (hasConflicts) {
        return failure(new SlotNotAvailableError());
      }

      // 4. Calculate prices
      const travelFee = dto.location === LocationType.HOME ? 5000 : 0; // Example: 5000 CFA for home service
      const totalPrice = service.price + travelFee;

      // 5. Create appointment entity
      const appointment = Appointment.create({
        userId: dto.userId,
        employeeId: dto.employeeId,
        serviceId: dto.serviceId,
        date: dto.date,
        endTime,
        location: dto.location,
        addressId: dto.addressId,
        customAddress: dto.customAddress,
        lat: dto.lat,
        lng: dto.lng,
        status: AppointmentStatus.PENDING,
        servicePrice: service.price,
        travelFee,
        totalPrice,
        notes: dto.notes,
        reminderSent24h: false,
        reminderSent2h: false,
      });

      // 6. Persist
      const savedAppointment = await this.deps.appointmentRepository.save(appointment);

      // 7. Publish domain event
      const event = new AppointmentCreatedEvent(savedAppointment.id, {
        appointmentId: savedAppointment.id,
        userId: savedAppointment.userId,
        employeeId: savedAppointment.employeeId,
        serviceId: savedAppointment.serviceId,
        date: savedAppointment.date.toISOString(),
        totalPrice: savedAppointment.totalPrice,
      });
      await this.deps.eventBus.publish(event);

      // 8. Return response DTO
      const response: AppointmentResponseDTO = {
        id: savedAppointment.id,
        userId: savedAppointment.userId,
        employeeId: savedAppointment.employeeId,
        serviceId: savedAppointment.serviceId,
        date: savedAppointment.date.toISOString(),
        endTime: savedAppointment.endTime.toISOString(),
        duration: service.duration,
        location: savedAppointment.location,
        status: savedAppointment.status,
        servicePrice: savedAppointment.totalPrice - travelFee,
        travelFee,
        totalPrice: savedAppointment.totalPrice,
        notes: dto.notes,
        canCancel: savedAppointment.isCancellable(),
        createdAt: savedAppointment.createdAt.toISOString(),
        updatedAt: savedAppointment.updatedAt.toISOString(),
      };

      return success(response);
    } catch (error) {
      return failure(error as Error);
    }
  }
}
