// ============================================
// SHARED KERNEL - Common Types
// ============================================

/**
 * Generic Result type for use cases
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Helper to create success result
 */
export const success = <T>(data: T): Result<T> => ({
  success: true,
  data,
});

/**
 * Helper to create failure result
 */
export const failure = <E = Error>(error: E): Result<never, E> => ({
  success: false,
  error,
});

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Base entity interface
 */
export interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Soft delete support
 */
export interface ISoftDeletable {
  deletedAt: Date | null;
  isDeleted: boolean;
}

/**
 * Audit fields
 */
export interface IAuditable {
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Generic ID type
 */
export type ID = string;

/**
 * Generic repository interface
 */
export interface IRepository<T extends IEntity> {
  findById(id: ID): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
  findAll(params?: PaginationParams): Promise<PaginatedResponse<T>>;
}

/**
 * Use case interface
 */
export interface IUseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<Result<TResponse>>;
}

/**
 * Query interface (CQRS)
 */
export interface IQuery<TResult> {
  execute(): Promise<Result<TResult>>;
}

/**
 * Command interface (CQRS)
 */
export interface ICommand<TResult> {
  execute(): Promise<Result<TResult>>;
}

/**
 * Value Object base interface
 */
export interface IValueObject<T> {
  equals(other: T): boolean;
  getValue(): any;
}
