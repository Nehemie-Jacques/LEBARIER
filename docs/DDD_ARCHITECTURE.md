# Architecture DDD + Microservices - LE BARBIER

## 📋 Vue d'ensemble

Cette documentation décrit l'architecture Domain-Driven Design (DDD) avec une approche Microservices pour le projet LE BARBIER.

## 🏗️ Principes architecturaux

### 1. Domain-Driven Design (DDD)
- **Bounded Contexts** : Chaque domaine est isolé avec ses propres modèles
- **Ubiquitous Language** : Langage métier partagé entre dev et business
- **Layered Architecture** : Séparation claire des responsabilités
- **Aggregates** : Regroupement logique d'entités

### 2. Architecture en couches

```
domain/
├── application/     # Use cases, orchestration, DTOs
├── domain/          # Entités, Value Objects, Domain Services, Repositories (interfaces)
├── infrastructure/  # Implémentations techniques (DB, API, Email, etc.)
└── presentation/    # Controllers, Routes API, UI Components
```

## 🎯 Bounded Contexts (Domaines)

### 1. **Booking Domain** (Réservations)
**Responsabilité** : Gestion complète des réservations de services
- Créer/modifier/annuler des rendez-vous
- Vérifier la disponibilité
- Gérer la file d'attente
- Envoyer des rappels

**Entités principales** :
- Appointment
- QueueEntry
- Availability

**Value Objects** :
- TimeSlot
- AppointmentStatus
- LocationInfo

### 2. **User Management Domain** (Gestion utilisateurs)
**Responsabilité** : Authentification et gestion des utilisateurs
- Inscription/Connexion
- Gestion des profils
- Gestion des rôles et permissions
- Sessions

**Entités principales** :
- User
- Session
- Address

**Value Objects** :
- Email
- PhoneNumber
- UserRole

### 3. **Catalog Domain** (Catalogue)
**Responsabilité** : Gestion des services et produits
- Services de coiffure
- Produits en vente
- Catégories

**Entités principales** :
- Service
- Product

**Value Objects** :
- Price
- ServiceCategory
- ProductCategory

### 4. **Order Domain** (Commandes)
**Responsabilité** : Gestion des commandes produits
- Panier
- Commandes
- Livraison
- Tracking

**Entités principales** :
- Order
- OrderItem

**Value Objects** :
- OrderStatus
- ShippingAddress

### 5. **Employee Domain** (Employés)
**Responsabilité** : Gestion des employés et leurs activités
- Profils employés
- Portfolio
- Statistiques
- Planning

**Entités principales** :
- Employee
- Portfolio
- EmployeeStats

### 6. **Review Domain** (Avis)
**Responsabilité** : Gestion des avis et évaluations
- Avis sur services
- Avis sur produits
- Modération

**Entités principales** :
- Review
- ProductReview

**Value Objects** :
- Rating
- ReviewStatus

### 7. **Loyalty Domain** (Fidélité)
**Responsabilité** : Programme de fidélité
- Points de fidélité
- Niveaux (tiers)
- Récompenses

**Entités principales** :
- LoyaltyTransaction
- LoyaltyReward

**Value Objects** :
- LoyaltyPoints
- LoyaltyTier

### 8. **Notification Domain** (Notifications)
**Responsabilité** : Envoi de notifications multi-canal
- Email
- SMS
- Push notifications
- In-app

**Entités principales** :
- Notification

**Value Objects** :
- NotificationChannel
- NotificationType

### 9. **Payment Domain** (Paiements)
**Responsabilité** : Gestion des paiements
- Intégration providers (Stripe, Orange Money, Momo)
- Factures
- Remboursements

**Entités principales** :
- Payment
- Invoice

**Value Objects** :
- PaymentMethod
- PaymentStatus
- Money

### 10. **Content Domain** (Contenu)
**Responsabilité** : Gestion de contenu
- Blog
- FAQ
- Pages statiques

**Entités principales** :
- BlogPost
- FAQ

### 11. **Analytics Domain** (Analytique)
**Responsabilité** : Tracking et analytics
- Événements
- Logs système
- Reporting

**Entités principales** :
- AnalyticsEvent
- SystemLog

## 🔄 Communication entre domaines

### 1. Domain Events
```typescript
// Exemple : BookingConfirmedEvent
{
  eventType: 'BOOKING_CONFIRMED',
  aggregateId: 'appointment-123',
  data: {
    userId: 'user-456',
    employeeId: 'emp-789',
    date: '2026-01-15T10:00:00Z'
  }
}
```

### 2. Shared Kernel
Composants partagés entre tous les domaines :
- `@shared/database` : Client Prisma
- `@shared/types` : Types communs
- `@shared/utils` : Utilitaires
- `@shared/events` : Event bus
- `@shared/errors` : Gestion d'erreurs
- `@shared/validation` : Schémas Zod

### 3. Anti-Corruption Layer (ACL)
Chaque domaine expose ses propres DTOs pour éviter le couplage.

## 📁 Structure des fichiers

```
src/
├── domains/
│   ├── booking/
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── create-appointment.use-case.ts
│   │   │   │   ├── cancel-appointment.use-case.ts
│   │   │   │   └── check-availability.use-case.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-appointment.dto.ts
│   │   │   │   └── appointment-response.dto.ts
│   │   │   ├── services/
│   │   │   │   └── booking.service.ts
│   │   │   └── events/
│   │   │       ├── booking-confirmed.event.ts
│   │   │       └── booking-cancelled.event.ts
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── appointment.entity.ts
│   │   │   │   └── queue-entry.entity.ts
│   │   │   ├── value-objects/
│   │   │   │   ├── time-slot.vo.ts
│   │   │   │   └── location-info.vo.ts
│   │   │   ├── repositories/
│   │   │   │   └── appointment.repository.interface.ts
│   │   │   ├── services/
│   │   │   │   └── availability.domain-service.ts
│   │   │   └── errors/
│   │   │       └── booking.errors.ts
│   │   ├── infrastructure/
│   │   │   ├── persistence/
│   │   │   │   ├── prisma/
│   │   │   │   │   └── appointment.repository.impl.ts
│   │   │   │   └── mappers/
│   │   │   │       └── appointment.mapper.ts
│   │   │   ├── api/
│   │   │   │   └── external-calendar.client.ts
│   │   │   └── messaging/
│   │   │       └── booking-event-publisher.ts
│   │   └── presentation/
│   │       ├── api/
│   │       │   └── routes/
│   │       │       └── appointments.route.ts
│   │       └── components/
│   │           ├── BookingStepper.tsx
│   │           └── DateTimePicker.tsx
│   │
│   ├── user-management/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │
│   ├── catalog/
│   ├── order/
│   ├── employee/
│   ├── review/
│   ├── loyalty/
│   ├── notification/
│   ├── payment/
│   ├── content/
│   └── analytics/
│
├── shared/
│   ├── database/
│   │   └── prisma.client.ts
│   ├── types/
│   │   ├── common.types.ts
│   │   └── enums.ts
│   ├── utils/
│   │   ├── date.utils.ts
│   │   ├── validation.utils.ts
│   │   └── string.utils.ts
│   ├── events/
│   │   ├── event-bus.ts
│   │   └── domain-event.interface.ts
│   ├── errors/
│   │   ├── base.error.ts
│   │   ├── domain.error.ts
│   │   └── application.error.ts
│   ├── validation/
│   │   └── schemas/
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error-handler.middleware.ts
│   │   └── logger.middleware.ts
│   └── config/
│       ├── app.config.ts
│       └── env.config.ts
│
├── app/                    # Next.js App Router (UI uniquement)
│   ├── (main)/
│   ├── (auth)/
│   ├── admin/
│   ├── employee/
│   ├── profile/
│   └── api/               # API Routes pointent vers les domaines
│
└── middleware.ts          # Next.js middleware
```

## 🎨 Patterns utilisés

### 1. Repository Pattern
```typescript
// Interface dans domain/
export interface IAppointmentRepository {
  findById(id: string): Promise<Appointment | null>;
  save(appointment: Appointment): Promise<void>;
  findByDateRange(start: Date, end: Date): Promise<Appointment[]>;
}

// Implémentation dans infrastructure/
export class PrismaAppointmentRepository implements IAppointmentRepository {
  // Implementation avec Prisma
}
```

### 2. Use Case Pattern
```typescript
export class CreateAppointmentUseCase {
  constructor(
    private appointmentRepo: IAppointmentRepository,
    private availabilityService: AvailabilityDomainService,
    private eventBus: IEventBus
  ) {}

  async execute(dto: CreateAppointmentDTO): Promise<AppointmentResponseDTO> {
    // 1. Validation
    // 2. Vérifier disponibilité
    // 3. Créer l'entité
    // 4. Persister
    // 5. Publier événement
    // 6. Retourner DTO
  }
}
```

### 3. Factory Pattern
```typescript
export class AppointmentFactory {
  static create(data: CreateAppointmentData): Appointment {
    // Business rules
    // Validation
    // Return new Appointment
  }
}
```

### 4. Value Object Pattern
```typescript
export class TimeSlot {
  private constructor(
    public readonly start: Date,
    public readonly end: Date
  ) {
    this.validate();
  }

  static create(start: Date, duration: number): TimeSlot {
    const end = new Date(start.getTime() + duration * 60000);
    return new TimeSlot(start, end);
  }

  private validate(): void {
    if (this.end <= this.start) {
      throw new InvalidTimeSlotError();
    }
  }

  overlaps(other: TimeSlot): boolean {
    return this.start < other.end && this.end > other.start;
  }
}
```

## 🔐 Sécurité

### 1. Authentication & Authorization
- Middleware Next-Auth dans `shared/middleware/`
- Guards par rôle dans chaque use case
- RBAC (Role-Based Access Control)

### 2. Validation
- DTOs avec Zod
- Validation au niveau domaine
- Sanitization des inputs

## 🚀 Déploiement Microservices (Future)

Chaque domaine peut devenir un microservice indépendant :

```
├── services/
│   ├── booking-service/     (Port 3001)
│   ├── user-service/        (Port 3002)
│   ├── catalog-service/     (Port 3003)
│   ├── payment-service/     (Port 3004)
│   └── notification-service/(Port 3005)
│
├── api-gateway/            (Port 3000)
└── shared-libs/
```

Communication via :
- REST APIs
- gRPC
- Message Queue (RabbitMQ, Kafka)

## 📊 Avantages de cette architecture

✅ **Maintenabilité** : Code organisé par domaine métier
✅ **Scalabilité** : Chaque domaine peut évoluer indépendamment
✅ **Testabilité** : Isolation claire pour les tests
✅ **Réutilisabilité** : Use cases et domain services réutilisables
✅ **Evolution** : Facile d'ajouter de nouveaux domaines
✅ **Commercialisation** : Architecture professionnelle prête pour la production

## 📚 Références

- [Domain-Driven Design - Eric Evans](https://www.domainlanguage.com/ddd/)
- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/)
- [Microservices Patterns - Chris Richardson](https://microservices.io/)
