// ============================================
// SHARED KERNEL - Date Utilities
// ============================================

import { format, parseISO, isValid, addMinutes, differenceInMinutes } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

/**
 * Format date to locale string
 */
export function formatDate(
  date: Date | string,
  formatString: string = 'PPP',
  locale: 'fr' | 'en' = 'fr'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    throw new Error('Invalid date');
  }

  return format(dateObj, formatString, {
    locale: locale === 'fr' ? fr : enUS,
  });
}

/**
 * Format time (HH:mm)
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'HH:mm');
}

/**
 * Add minutes to date
 */
export function addMinutesToDate(date: Date, minutes: number): Date {
  return addMinutes(date, minutes);
}

/**
 * Calculate duration in minutes between two dates
 */
export function calculateDuration(start: Date, end: Date): number {
  return differenceInMinutes(end, start);
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date): boolean {
  return date < new Date();
}

/**
 * Check if date is in the future
 */
export function isFuture(date: Date): boolean {
  return date > new Date();
}

/**
 * Get start of day
 */
export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get end of day
 */
export function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}
