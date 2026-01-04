# 🏗️ Nouvelle Architecture DDD - LE BARBIER

## 📖 Vue d'ensemble

Le projet a été restructuré selon les principes **Domain-Driven Design (DDD)** avec une architecture en couches pour préparer une future évolution vers des **Microservices**.

## 🎯 Pourquoi cette architecture ?

### Problèmes de l'ancienne structure
- ❌ Code métier mélangé avec l'infrastructure
- ❌ Difficile à tester
- ❌ Couplage fort entre les modules
- ❌ Pas d'isolation des domaines métier
- ❌ Difficile à faire évoluer

### Avantages de la nouvelle architecture
- ✅ **Séparation claire des responsabilités**
- ✅ **Testabilité** : Chaque couche peut être testée indépendamment
- ✅ **Maintenabilité** : Code organisé par domaine métier
- ✅ **Scalabilité** : Prêt pour une évolution microservices
- ✅ **Réutilisabilité** : Use cases réutilisables
- ✅ **Qualité professionnelle** : Architecture enterprise-grade

## 📁 Structure du projet

```
src/
├── domains/              # Bounded Contexts (Domaines métier)
│   ├── booking/         # ✅ Exemple complet implémenté
│   ├── user-management/
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
├── shared/              # Shared Kernel (Code partagé)
│   ├── database/        # Client Prisma
│   ├── types/           # Types communs
│   ├── utils/           # Utilitaires
│   ├── events/          # Event Bus
│   ├── errors/          # Classes d'erreurs
│   └── validation/      # Schémas de validation
│
└── app/                 # Next.js App Router (UI)
    ├── api/             # API Routes (utilisent les use cases)
    ├── (main)/          # Pages publiques
    ├── (auth)/          # Pages authentification
    ├── admin/           # Dashboard admin
    └── profile/         # Espace client
```

## 🏛️ Architecture en couches

Chaque domaine suit cette structure :

```
booking/
├── domain/              # 💎 Cœur métier (pure business logic)
│   ├── entities/        # Entités métier (Appointment, etc.)
│   ├── value-objects/   # Valeurs métier (TimeSlot, Price, etc.)
│   ├── repositories/    # Interfaces (contrats)
│   ├── services/        # Services domaine
│   └── errors/          # Erreurs métier
│
├── application/         # 🎯 Cas d'utilisation
│   ├── use-cases/       # Orchestration (CreateAppointment, etc.)
│   ├── dto/             # Data Transfer Objects
│   ├── services/        # Services applicatifs
│   └── events/          # Événements domaine
│
├── infrastructure/      # 🔧 Implémentation technique
│   ├── persistence/     # Accès base de données (Prisma)
│   │   ├── prisma/      # Repository implementations
│   │   └── mappers/     # Mapping Domain <-> DB
│   ├── api/             # Clients API externes
│   └── messaging/       # Event publishers
│
└── presentation/        # 🎨 Interface utilisateur
    ├── api/             # Routes API Next.js
    └── components/      # Composants React
```

## 🚀 Comment créer un nouveau domaine

### Exemple : Créer le domaine Review

#### 1. Créer l'entité (Domain Layer)

```typescript
// src/domains/review/domain/entities/review.entity.ts
export class Review implements IEntity {
  private constructor(private props: ReviewProps) {}

  static create(data: CreateReviewData): Review {
    const review = new Review({
      ...data,
      id: '',
      isApproved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    review.validate();
    return review;
  }

  approve(): void {
    if (this.props.isApproved) {
      throw new BusinessRuleViolationError('Review already approved');
    }
    this.props.isApproved = true;
    this.props.updatedAt = new Date();
  }

  private validate(): void {
    if (this.props.rating < 1 || this.props.rating > 5) {
      throw new ValidationError('Rating must be between 1 and 5');
    }
  }
}
```

#### 2. Créer le repository (Domain Layer)

```typescript
// src/domains/review/domain/repositories/review.repository.interface.ts
export interface IReviewRepository extends IRepository<Review> {
  findByUserId(userId: string): Promise<Review[]>;
  findByEmployeeId(employeeId: string): Promise<Review[]>;
  findPending(): Promise<Review[]>;
}
```

#### 3. Créer les DTOs (Application Layer)

```typescript
// src/domains/review/application/dto/create-review.dto.ts
export const createReviewSchema = z.object({
  userId: z.string(),
  appointmentId: z.string(),
  employeeId: z.string(),
  serviceRating: z.number().min(1).max(5),
  employeeRating: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
});

export type CreateReviewDTO = z.infer<typeof createReviewSchema>;
```

#### 4. Créer le Use Case (Application Layer)

```typescript
// src/domains/review/application/use-cases/create-review.use-case.ts
export class CreateReviewUseCase implements IUseCase<CreateReviewDTO, ReviewResponseDTO> {
  constructor(
    private reviewRepo: IReviewRepository,
    private appointmentRepo: IAppointmentRepository,
    private eventBus: IEventBus
  ) {}

  async execute(dto: CreateReviewDTO): Promise<Result<ReviewResponseDTO>> {
    // 1. Verify appointment exists and is completed
    // 2. Check if review already exists
    // 3. Create review entity
    // 4. Save to database
    // 5. Publish ReviewCreatedEvent
    // 6. Return DTO
  }
}
```

#### 5. Implémenter le Repository (Infrastructure Layer)

```typescript
// src/domains/review/infrastructure/persistence/prisma/review.repository.impl.ts
export class PrismaReviewRepository implements IReviewRepository {
  async findByUserId(userId: string): Promise<Review[]> {
    const reviews = await prisma.review.findMany({
      where: { userId },
    });
    return reviews.map(ReviewMapper.toDomain);
  }
}
```

#### 6. Créer la route API (Presentation Layer)

```typescript
// src/app/api/reviews/route.ts
export async function POST(req: Request) {
  const useCase = new CreateReviewUseCase(dependencies);
  const result = await useCase.execute(data);
  
  if (!result.success) {
    return Response.json({ error: result.error.message }, { status: 400 });
  }
  
  return Response.json(result.data, { status: 201 });
}
```

## 🔄 Communication entre domaines

Les domaines communiquent via des **événements** pour éviter le couplage :

```typescript
// Domaine Booking publie un événement
const event = new AppointmentCreatedEvent(appointmentId, data);
await eventBus.publish(event);

// Domaine Notification l'écoute
class SendConfirmationHandler implements IEventHandler<AppointmentCreatedEvent> {
  async handle(event: AppointmentCreatedEvent): Promise<void> {
    await this.emailService.send({
      to: event.data.userId,
      template: 'appointment-confirmation',
      data: event.data,
    });
  }
}

eventBus.subscribe('APPOINTMENT_CREATED', new SendConfirmationHandler());
```

## 🧪 Tests

### Test d'entité
```typescript
describe('Review Entity', () => {
  it('should approve review', () => {
    const review = Review.create(validData);
    review.approve();
    expect(review.isApproved).toBe(true);
  });
});
```

### Test de Use Case
```typescript
describe('CreateReviewUseCase', () => {
  it('should create review', async () => {
    const mockRepo = { save: jest.fn() };
    const useCase = new CreateReviewUseCase(mockRepo, eventBus);
    
    const result = await useCase.execute(validDTO);
    
    expect(result.success).toBe(true);
    expect(mockRepo.save).toHaveBeenCalled();
  });
});
```

## 📚 Exemples de code

### ✅ Domaine Booking
Le domaine **Booking** est **entièrement implémenté** et sert de référence :

- ✅ Entité `Appointment` avec business rules
- ✅ Value Objects `TimeSlot`, `LocationInfo`
- ✅ Repository Interface et Implementation (Prisma)
- ✅ Use Cases `CreateAppointment`, `CancelAppointment`
- ✅ DTOs et validation Zod
- ✅ Events et Event Bus
- ✅ Route API complète

**Chemin** : `src/domains/booking/`

### 📖 Documentation
- [Architecture complète](./docs/DDD_ARCHITECTURE.md)
- [Guide de migration](./docs/MIGRATION_GUIDE.md)

## 🛠️ Développement

### Ajouter un nouveau Use Case

1. Créer le fichier dans `application/use-cases/`
2. Implémenter l'interface `IUseCase<Request, Response>`
3. Injecter les dépendances nécessaires (repositories, services)
4. Suivre le pattern :
   - Validation
   - Business logic
   - Persistence
   - Event publishing
   - Return DTO

### Ajouter une nouvelle entité

1. Créer dans `domain/entities/`
2. Implémenter `IEntity`
3. Factory method `create()`
4. Business methods (approve, cancel, etc.)
5. Validation privée
6. Getter pour les propriétés

### Ajouter un nouveau Value Object

1. Créer dans `domain/value-objects/`
2. Implémenter `IValueObject<T>`
3. Constructor privé
4. Factory method `create()`
5. Méthode `equals()`
6. Immutable !

## 🎓 Principes à respecter

### 1. Dependency Rule
- Domain ne dépend de rien
- Application dépend de Domain
- Infrastructure dépend de Domain et Application
- Presentation dépend de tout

### 2. Immutabilité
- Value Objects sont immutables
- Entités peuvent changer mais via des méthodes

### 3. Validation
- DTOs : validation format (Zod)
- Entities : validation business rules

### 4. Events
- Utilisez les events pour la communication inter-domaines
- Pas de dépendances directes

### 5. Testabilité
- Tout doit être testable unitairement
- Utilisez les interfaces pour le mocking

## 🚀 Prochaines étapes

1. **Migrer User Management Domain**
   - Authentification
   - Profils utilisateurs
   - Sessions

2. **Migrer Catalog Domain**
   - Services
   - Products

3. **Migrer Order Domain**
   - Panier
   - Commandes
   - Livraison

4. **Tests**
   - Tests unitaires pour chaque domaine
   - Tests d'intégration
   - Tests E2E

5. **Documentation**
   - Documenter chaque domaine
   - Exemples d'utilisation
   - API documentation

6. **Microservices (Future)**
   - Extraire chaque domaine en service
   - API Gateway
   - Message Queue

## 💡 Conseils

- **Commencez petit** : Un domaine à la fois
- **Utilisez l'exemple** : Copiez le pattern du domaine Booking
- **Tests d'abord** : TDD quand possible
- **Code review** : Systématique
- **Documentation** : Au fur et à mesure

## 📞 Support

Pour toute question sur l'architecture :
1. Lire la [documentation DDD](./docs/DDD_ARCHITECTURE.md)
2. Étudier l'exemple du domaine Booking
3. Consulter le [guide de migration](./docs/MIGRATION_GUIDE.md)

---

**Architecture réalisée pour LE BARBIER - Janvier 2026**
