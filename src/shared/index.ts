// ============================================
// SHARED KERNEL - Exports
// ============================================

// Errors
export * from './errors/base.error';

// Events
export * from './events/event-bus';
export * from './events/domain-event';

// Types
export * from './types/common.types';
export * from './types/enums';

// Database
export { default as prisma } from './database/prisma.client';

// Utils
export * from './utils/date.utils';
export * from './utils/string.utils';
export * from './utils/validation.utils';
