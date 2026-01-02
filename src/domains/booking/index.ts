// ============================================
// BOOKING DOMAIN - Exports
// ============================================

// Domain Layer
export * from './domain/entities/appointment.entity';
export * from './domain/value-objects/time-slot.vo';
export * from './domain/value-objects/location-info.vo';
export * from './domain/repositories/appointment.repository.interface';
export * from './domain/errors/booking.errors';

// Application Layer
export * from './application/use-cases/create-appointment.use-case';
export * from './application/use-cases/cancel-appointment.use-case';
export * from './application/dto/create-appointment.dto';
export * from './application/dto/appointment-response.dto';
export * from './application/dto/availability-query.dto';
export * from './application/events/appointment-created.event';
export * from './application/events/appointment-cancelled.event';

// Infrastructure Layer
export * from './infrastructure/persistence/prisma/appointment.repository.impl';
export * from './infrastructure/persistence/mappers/appointment.mapper';
