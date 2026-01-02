// ============================================
// BOOKING DOMAIN - TimeSlot Value Object
// ============================================

import type { IValueObject } from '@/shared/types/common.types';
import { ValidationError } from '@/shared/errors/base.error';

export class TimeSlot implements IValueObject<TimeSlot> {
  private constructor(
    public readonly start: Date,
    public readonly end: Date
  ) {
    this.validate();
  }

  static create(start: Date, end: Date): TimeSlot {
    return new TimeSlot(start, end);
  }

  static createFromDuration(start: Date, durationMinutes: number): TimeSlot {
    const end = new Date(start.getTime() + durationMinutes * 60000);
    return new TimeSlot(start, end);
  }

  private validate(): void {
    if (!(this.start instanceof Date) || !(this.end instanceof Date)) {
      throw new ValidationError('Start and end must be valid dates');
    }

    if (this.end <= this.start) {
      throw new ValidationError('End time must be after start time');
    }
  }

  /**
   * Check if this slot overlaps with another
   */
  overlaps(other: TimeSlot): boolean {
    return this.start < other.end && this.end > other.start;
  }

  /**
   * Check if this slot contains a specific time
   */
  contains(time: Date): boolean {
    return time >= this.start && time < this.end;
  }

  /**
   * Get duration in minutes
   */
  getDurationMinutes(): number {
    return (this.end.getTime() - this.start.getTime()) / 60000;
  }

  /**
   * Check if slot is in the past
   */
  isPast(): boolean {
    return this.end < new Date();
  }

  /**
   * Check if slot is in the future
   */
  isFuture(): boolean {
    return this.start > new Date();
  }

  equals(other: TimeSlot): boolean {
    return (
      this.start.getTime() === other.start.getTime() &&
      this.end.getTime() === other.end.getTime()
    );
  }

  getValue(): { start: Date; end: Date } {
    return {
      start: this.start,
      end: this.end,
    };
  }

  toString(): string {
    return `${this.start.toISOString()} - ${this.end.toISOString()}`;
  }
}
