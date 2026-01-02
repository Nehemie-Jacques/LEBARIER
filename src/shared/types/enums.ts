// ============================================
// SHARED KERNEL - Enums (extracted from Prisma)
// ============================================

export enum Role {
  CLIENT = 'CLIENT',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN',
}

export enum Language {
  FR = 'FR',
  EN = 'EN',
}

export enum LoyaltyTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

export enum ServiceCategory {
  COUPE = 'COUPE',
  BARBE = 'BARBE',
  SOINS = 'SOINS',
  COLORATION = 'COLORATION',
  PACKAGE = 'PACKAGE',
  OTHER = 'OTHER',
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum LocationType {
  SALON = 'SALON',
  HOME = 'HOME',
}

export enum ProductCategory {
  HAIR_CARE = 'HAIR_CARE',
  BEARD_CARE = 'BEARD_CARE',
  STYLING = 'STYLING',
  ACCESSORIES = 'ACCESSORIES',
  SKINCARE = 'SKINCARE',
  OTHER = 'OTHER',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CARD = 'CARD',
  ORANGE_MONEY = 'ORANGE_MONEY',
  MOMO = 'MOMO',
  CASH = 'CASH',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

export enum TransactionType {
  EARN = 'EARN',
  REDEEM = 'REDEEM',
  EXPIRE = 'EXPIRE',
  BONUS = 'BONUS',
  REFUND = 'REFUND',
}

export enum NotificationType {
  APPOINTMENT_CONFIRMED = 'APPOINTMENT_CONFIRMED',
  APPOINTMENT_REMINDER = 'APPOINTMENT_REMINDER',
  APPOINTMENT_CANCELLED = 'APPOINTMENT_CANCELLED',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  ORDER_SHIPPED = 'ORDER_SHIPPED',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  LOYALTY_POINTS = 'LOYALTY_POINTS',
  PROMOTION = 'PROMOTION',
  REVIEW_REQUEST = 'REVIEW_REQUEST',
  SYSTEM = 'SYSTEM',
}

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP',
}

export enum PromotionType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
  FREE_SERVICE = 'FREE_SERVICE',
  FREE_PRODUCT = 'FREE_PRODUCT',
}
