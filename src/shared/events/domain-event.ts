// ============================================
// SHARED KERNEL - Domain Event Base Class
// ============================================

import { randomUUID } from 'crypto';
import type { IDomainEvent } from './event-bus';

/**
 * Abstract base class for domain events
 */
export abstract class DomainEvent<T = any> implements IDomainEvent<T> {
  public readonly eventId: string;
  public readonly occurredAt: Date;
  public readonly version: number;

  constructor(
    public readonly eventType: string,
    public readonly aggregateId: string,
    public readonly data: T,
    version: number = 1
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.version = version;
  }

  /**
   * Convert event to plain object for serialization
   */
  toJSON() {
    return {
      eventId: this.eventId,
      eventType: this.eventType,
      aggregateId: this.aggregateId,
      occurredAt: this.occurredAt.toISOString(),
      data: this.data,
      version: this.version,
    };
  }
}
