// ============================================
// BOOKING DOMAIN - Create Appointment DTO
// ============================================

import { z } from 'zod';
import { LocationType } from '@prisma/client';

export const createAppointmentSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  serviceId: z.string().min(1, 'Service ID is required'),
  date: z.coerce.date(),
  location: z.nativeEnum(LocationType),
  addressId: z.string().optional(),
  customAddress: z.string().optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  notes: z.string().max(500).optional(),
}).refine(
  (data) => {
    if (data.location === LocationType.HOME) {
      return Boolean(data.addressId || data.customAddress);
    }
    return true;
  },
  {
    message: 'Home service requires an address',
    path: ['addressId'],
  }
);

export type CreateAppointmentDTO = z.infer<typeof createAppointmentSchema>;
