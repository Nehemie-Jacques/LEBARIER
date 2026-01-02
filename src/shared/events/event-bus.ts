// ============================================
// SHARED KERNEL - Event Bus
// ============================================

/**
 * Base interface for all domain events
 */
export interface IDomainEvent<T = any> {
  eventId: string;
  eventType: string;
  aggregateId: string;
  occurredAt: Date;
  data: T;
  version?: number;
}

/**
 * Event handler interface
 */
export interface IEventHandler<T extends IDomainEvent = IDomainEvent> {
  handle(event: T): Promise<void> | void;
}

/**
 * Event bus interface
 */
export interface IEventBus {
  publish<T extends IDomainEvent>(event: T): Promise<void>;
  subscribe<T extends IDomainEvent>(
    eventType: string,
    handler: IEventHandler<T>
  ): void;
  unsubscribe(eventType: string, handler: IEventHandler): void;
}

/**
 * Simple in-memory event bus implementation
 * For production, consider using RabbitMQ, Kafka, or AWS EventBridge
 */
export class InMemoryEventBus implements IEventBus {
  private handlers: Map<string, Set<IEventHandler>> = new Map();

  async publish<T extends IDomainEvent>(event: T): Promise<void> {
    const handlers = this.handlers.get(event.eventType);
    
    if (!handlers || handlers.size === 0) {
      console.warn(`No handlers registered for event type: ${event.eventType}`);
      return;
    }

    // Execute all handlers in parallel
    await Promise.all(
      Array.from(handlers).map(handler => 
        Promise.resolve(handler.handle(event))
          .catch(error => {
            console.error(
              `Error handling event ${event.eventType} by ${handler.constructor.name}:`,
              error
            );
          })
      )
    );
  }

  subscribe<T extends IDomainEvent>(
    eventType: string,
    handler: IEventHandler<T>
  ): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);
  }

  unsubscribe(eventType: string, handler: IEventHandler): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
    }
  }
}

/**
 * Singleton instance of the event bus
 */
export const eventBus = new InMemoryEventBus();
