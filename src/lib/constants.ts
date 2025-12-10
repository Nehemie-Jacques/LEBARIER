export const SITE_NAME = 'Le Barbier';
export const SITE_DESCRIPTION = 'Salon de coiffure professionnel';

export const ROLES = {
  CLIENT: 'CLIENT',
  EMPLOYEE: 'EMPLOYEE',
  ADMIN: 'ADMIN',
} as const;

export const APPOINTMENT_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;
