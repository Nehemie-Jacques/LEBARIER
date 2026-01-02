// ============================================
// BOOKING DOMAIN - Availability Query DTO
// ============================================

import { z } from 'zod';

export const availabilityQuerySchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  date: z.coerce.date(),
  serviceId: z.string().min(1, 'Service ID is required'),
});

export type AvailabilityQueryDTO = z.infer<typeof availabilityQuerySchema>;

export interface TimeSlotDTO {
  start: string; // ISO string
  end: string; // ISO string
  available: boolean;
}

export interface AvailabilityResponseDTO {
  employeeId: string;
  date: string;
  slots: TimeSlotDTO[];
}
