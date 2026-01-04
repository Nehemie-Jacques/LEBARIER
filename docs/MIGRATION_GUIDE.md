# Guide de Migration - DDD Architecture

## 🎯 Objectif

Ce guide vous aide à migrer progressivement le projet LE BARBIER vers la nouvelle architecture DDD.

## 📋 Plan de migration

### Phase 1 : Configuration et Shared Kernel ✅
- [x] Créer la structure de dossiers
- [x] Configurer tsconfig.json avec les path aliases
- [x] Implémenter le Shared Kernel (errors, events, types, utils)
- [x] Créer le client Prisma centralisé

### Phase 2 : Domaine Booking (Exemple complet) ✅
- [x] Entités (Appointment)
- [x] Value Objects (TimeSlot, LocationInfo)
- [x] Repository Interface
- [x] Use Cases (Create, Cancel)
- [x] DTOs
- [x] Events
- [x] Infrastructure (Prisma Repository)
- [x] API Routes

### Phase 3 : Migration des autres domaines
Appliquer le même pattern aux autres domaines :

#### 3.1 User Management Domain
```
src/domains/user-management/
├── domain/
│   ├── entities/
│   │   ├── user.entity.ts
│   │   └── session.entity.ts
│   ├── value-objects/
│   │   ├── email.vo.ts
│   │   ├── password.vo.ts
│   │   └── phone-number.vo.ts
│   └── repositories/
│       └── user.repository.interface.ts
├── application/
│   ├── use-cases/
│   │   ├── register-user.use-case.ts
│   │   ├── login-user.use-case.ts
│   │   └── update-profile.use-case.ts
│   └── dto/
│       ├── register-user.dto.ts
│       └── user-response.dto.ts
└── infrastructure/
    └── persistence/
        └── prisma/
            └── user.repository.impl.ts
```

#### 3.2 Catalog Domain (Services + Products)
```
src/domains/catalog/
├── domain/
│   ├── entities/
│   │   ├── service.entity.ts
│   │   └── product.entity.ts
│   └── value-objects/
│       ├── price.vo.ts
│       └── stock.vo.ts
```

#### 3.3 Order Domain
#### 3.4 Employee Domain
#### 3.5 Review Domain
#### 3.6 Loyalty Domain
#### 3.7 Notification Domain
#### 3.8 Payment Domain
#### 3.9 Content Domain
#### 3.10 Analytics Domain

### Phase 4 : Routes API Next.js
Déplacer les routes API existantes pour utiliser les use cases :

**Avant (ancien système) :**
```typescript
// src/app/api/appointments/route.ts
export async function POST(req: Request) {
  const data = await req.json();
  const appointment = await prisma.appointment.create({ data });
  return Response.json(appointment);
}
```

**Après (DDD) :**
```typescript
// src/app/api/appointments/route.ts
import { CreateAppointmentUseCase } from '@/domains/booking/application/use-cases/create-appointment.use-case';

export async function POST(req: Request) {
  const useCase = new CreateAppointmentUseCase(dependencies);
  const result = await useCase.execute(data);
  
  if (!result.success) {
    return Response.json({ error: result.error.message }, { status: 400 });
  }
  
  return Response.json(result.data, { status: 201 });
}
```

### Phase 5 : Composants UI
Les composants React/Next.js continuent d'appeler les API routes :

```typescript
// components/booking/BookingForm.tsx
const createAppointment = async (data) => {
  const response = await fetch('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  return response.json();
};
```

## 🔧 Configuration Next.js

### 1. Mettre à jour next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Enable path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
      '@/shared': path.resolve(__dirname, './src/shared'),
      '@/domains': path.resolve(__dirname, './src/domains'),
    };
    return config;
  },
};

module.exports = nextConfig;
```

### 2. tsconfig.json (déjà fait ✅)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/domains/*": ["./src/domains/*"]
    }
  }
}
```

## 📦 Structure des fichiers par domaine

### Exemple : Payment Domain

```typescript
// 1. Entity
// src/domains/payment/domain/entities/payment.entity.ts
export class Payment implements IEntity {
  private constructor(private props: PaymentProps) {}
  
  static create(data: CreatePaymentData): Payment {
    // Business rules
    return new Payment(data);
  }
  
  markAsPaid(): void {
    if (this.props.status !== PaymentStatus.PENDING) {
      throw new BusinessRuleViolationError('Payment already processed');
    }
    this.props.status = PaymentStatus.PAID;
    this.props.paidAt = new Date();
  }
}

// 2. Repository Interface
// src/domains/payment/domain/repositories/payment.repository.interface.ts
export interface IPaymentRepository extends IRepository<Payment> {
  findByTransactionId(transactionId: string): Promise<Payment | null>;
  findByOrderId(orderId: string): Promise<Payment | null>;
}

// 3. Use Case
// src/domains/payment/application/use-cases/process-payment.use-case.ts
export class ProcessPaymentUseCase {
  constructor(
    private paymentRepo: IPaymentRepository,
    private stripeClient: StripeClient
  ) {}
  
  async execute(dto: ProcessPaymentDTO): Promise<Result<PaymentResponseDTO>> {
    // 1. Create payment entity
    // 2. Process with payment gateway
    // 3. Update status
    // 4. Publish event
    // 5. Return response
  }
}

// 4. Infrastructure
// src/domains/payment/infrastructure/persistence/prisma/payment.repository.impl.ts
export class PrismaPaymentRepository implements IPaymentRepository {
  async findByTransactionId(id: string): Promise<Payment | null> {
    const data = await prisma.payment.findUnique({
      where: { transactionId: id },
    });
    return data ? PaymentMapper.toDomain(data) : null;
  }
}

// 5. API Route
// src/app/api/payments/route.ts
export async function POST(req: Request) {
  const useCase = new ProcessPaymentUseCase(dependencies);
  const result = await useCase.execute(data);
  return Response.json(result.data);
}
```

## 🔄 Event Handlers

Les événements permettent la communication entre domaines :

```typescript
// src/domains/notification/application/handlers/appointment-created.handler.ts
import type { IEventHandler } from '@/shared/events/event-bus';
import type { AppointmentCreatedEvent } from '@/domains/booking/application/events/appointment-created.event';

export class SendAppointmentConfirmationHandler 
  implements IEventHandler<AppointmentCreatedEvent> 
{
  async handle(event: AppointmentCreatedEvent): Promise<void> {
    const { userId, date } = event.data;
    
    // Send email notification
    await this.emailService.send({
      to: userId,
      template: 'appointment-confirmation',
      data: { date },
    });
  }
}

// Register handler
eventBus.subscribe('APPOINTMENT_CREATED', new SendAppointmentConfirmationHandler());
```

## 🧪 Tests

### Test d'entité
```typescript
// tests/unit/domains/booking/appointment.entity.test.ts
describe('Appointment Entity', () => {
  it('should cancel appointment when allowed', () => {
    const appointment = Appointment.create({...});
    appointment.cancel('User request');
    expect(appointment.status).toBe(AppointmentStatus.CANCELLED);
  });
  
  it('should throw error when cancelling completed appointment', () => {
    const appointment = createCompletedAppointment();
    expect(() => appointment.cancel()).toThrow(BusinessRuleViolationError);
  });
});
```

### Test de use case
```typescript
// tests/unit/domains/booking/create-appointment.use-case.test.ts
describe('CreateAppointmentUseCase', () => {
  it('should create appointment when slot is available', async () => {
    const mockRepo = createMockRepository();
    const useCase = new CreateAppointmentUseCase({ appointmentRepository: mockRepo });
    
    const result = await useCase.execute(validDTO);
    
    expect(result.success).toBe(true);
    expect(mockRepo.save).toHaveBeenCalled();
  });
});
```

## 📝 Checklist par domaine

Pour chaque domaine, suivre cette checklist :

- [ ] **Domain Layer**
  - [ ] Entités créées
  - [ ] Value Objects créés
  - [ ] Repository Interface défini
  - [ ] Domain Services (si nécessaire)
  - [ ] Erreurs métier définies

- [ ] **Application Layer**
  - [ ] Use Cases implémentés
  - [ ] DTOs créés
  - [ ] Events définis
  - [ ] Event Handlers créés

- [ ] **Infrastructure Layer**
  - [ ] Repository Prisma implémenté
  - [ ] Mappers créés
  - [ ] Clients externes (si nécessaire)

- [ ] **Presentation Layer**
  - [ ] Routes API migrées
  - [ ] Composants UI adaptés

- [ ] **Tests**
  - [ ] Tests unitaires entités
  - [ ] Tests unitaires use cases
  - [ ] Tests d'intégration repository
  - [ ] Tests E2E API

## 🚀 Commandes utiles

```bash
# Vérifier les erreurs TypeScript
npm run type-check

# Linter
npm run lint

# Tests
npm test

# Tests spécifiques à un domaine
npm test -- domains/booking

# Build
npm run build
```

## 📚 Ressources

- [Documentation DDD complète](./DDD_ARCHITECTURE.md)
- [Exemples de code](../src/domains/booking)
- [Shared Kernel](../src/shared)

## ⚠️ Points d'attention

1. **Ne pas mélanger les couches** : Domain ne doit jamais importer Infrastructure
2. **Utiliser les interfaces** : Toujours dépendre des abstractions
3. **Events pour la communication** : Éviter les dépendances directes entre domaines
4. **DTOs aux frontières** : Ne jamais exposer les entités directement
5. **Validation en couches** : DTO (format) + Entity (business rules)

## 🎓 Formation de l'équipe

1. Lire la documentation DDD
2. Étudier le domaine Booking (référence)
3. Implémenter un petit domaine en pair programming
4. Code review systématique
5. Partage de connaissances en équipe

---

**Prochaine étape** : Commencer par migrer le domaine **User Management** en suivant l'exemple du domaine **Booking**.
