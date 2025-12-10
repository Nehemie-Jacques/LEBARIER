import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
});

export const appointmentSchema = z.object({
  serviceId: z.string(),
  employeeId: z.string(),
  date: z.date(),
  startTime: z.string(),
  location: z.enum(['SALON', 'HOME', 'ONLINE']),
});
