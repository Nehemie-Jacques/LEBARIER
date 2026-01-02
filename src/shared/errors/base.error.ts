// ============================================
// SHARED KERNEL - Base Error Classes
// ============================================

/**
 * Base class for all domain errors
 */
export abstract class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Base class for all application errors
 */
export abstract class ApplicationError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Infrastructure errors (database, external APIs, etc.)
 */
export class InfrastructureError extends Error {
  constructor(
    message: string,
    public readonly code: string = 'INFRASTRUCTURE_ERROR',
    public readonly statusCode: number = 500,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'InfrastructureError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation errors
 */
export class ValidationError extends DomainError {
  constructor(
    message: string,
    public readonly field?: string,
    public readonly constraints?: Record<string, string>
  ) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

/**
 * Not found errors
 */
export class NotFoundError extends DomainError {
  constructor(
    resource: string,
    identifier?: string
  ) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(message, 'NOT_FOUND', 404);
  }
}

/**
 * Unauthorized errors
 */
export class UnauthorizedError extends DomainError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

/**
 * Forbidden errors
 */
export class ForbiddenError extends DomainError {
  constructor(message: string = 'Access forbidden') {
    super(message, 'FORBIDDEN', 403);
  }
}

/**
 * Conflict errors (duplicate, etc.)
 */
export class ConflictError extends DomainError {
  constructor(message: string, public readonly conflictingField?: string) {
    super(message, 'CONFLICT', 409);
  }
}

/**
 * Business rule violation
 */
export class BusinessRuleViolationError extends DomainError {
  constructor(message: string, public readonly rule?: string) {
    super(message, 'BUSINESS_RULE_VIOLATION', 422);
  }
}
