// ============================================
// BOOKING DOMAIN - Appointment Repository Interface
// ============================================

import type { IRepository, PaginatedResponse, PaginationParams } from '@/shared/types/common.types';
import { Appointment } from '../entities/appointment.entity';
import { TimeSlot } from '../value-objects/time-slot.vo';
import { AppointmentStatus } from '@/shared/types/enums';

export interface IAppointmentRepository extends IRepository<Appointment> {
  // Basic CRUD
  findById(id: string): Promise<Appointment | null>;
  save(appointment: Appointment): Promise<Appointment>;
  update(appointment: Appointment): Promise<Appointment>;
  delete(id: string): Promise<void>;
  
  // Query methods
  findByUserId(userId: string, params?: PaginationParams): Promise<PaginatedResponse<Appointment>>;
  findByEmployeeId(employeeId: string, params?: PaginationParams): Promise<PaginatedResponse<Appointment>>;
  findByDateRange(start: Date, end: Date): Promise<Appointment[]>;
  findByEmployeeAndDate(employeeId: string, date: Date): Promise<Appointment[]>;
  findByStatus(status: AppointmentStatus, params?: PaginationParams): Promise<PaginatedResponse<Appointment>>;
  
  // Availability checks
  checkConflicts(employeeId: string, timeSlot: TimeSlot): Promise<boolean>;
  getEmployeeAppointmentsForDay(employeeId: string, date: Date): Promise<Appointment[]>;
  
  // Reminders
  findAppointmentsNeedingReminder24h(): Promise<Appointment[]>;
  findAppointmentsNeedingReminder2h(): Promise<Appointment[]>;
  
  // Statistics
  countByStatus(status: AppointmentStatus): Promise<number>;
  countByEmployeeAndDateRange(employeeId: string, start: Date, end: Date): Promise<number>;
}
