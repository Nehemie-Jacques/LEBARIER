// Database models types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CLIENT' | 'EMPLOYEE' | 'ADMIN';
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  price: number;
  duration: number;
}

export interface Appointment {
  id: string;
  userId: string;
  employeeId: string;
  serviceId: string;
  date: Date;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}
