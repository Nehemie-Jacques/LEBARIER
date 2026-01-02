// ============================================
// BOOKING DOMAIN - Appointment Response DTO
// ============================================

import { AppointmentStatus, LocationType } from '@/shared/types/enums';

export interface AppointmentResponseDTO {
  id: string;
  userId: string;
  employeeId: string;
  employeeName?: string;
  employeeAvatar?: string;
  serviceId: string;
  serviceName?: string;
  serviceImage?: string;
  date: string; // ISO string
  endTime: string; // ISO string
  duration: number; // minutes
  location: LocationType;
  address?: string;
  status: AppointmentStatus;
  servicePrice: number;
  travelFee: number;
  totalPrice: number;
  notes?: string;
  canCancel: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentListItemDTO {
  id: string;
  date: string;
  employeeName: string;
  serviceName: string;
  status: AppointmentStatus;
  totalPrice: number;
  location: LocationType;
}
