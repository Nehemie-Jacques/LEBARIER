# Architecture DDD - Diagrammes

## 🏗️ Vue d'ensemble de l'architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Next.js    │  │  API Routes  │  │  React Components    │  │
│  │   App Router │  │  (REST/tRPC) │  │  (UI)                │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       APPLICATION LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Use Cases   │  │     DTOs     │  │   Domain Events      │  │
│  │ (Business    │  │ (Data Trans- │  │  (Event Handlers)    │  │
│  │  Logic)      │  │   fer Obj)   │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         DOMAIN LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Entities   │  │ Value Objects│  │    Repositories      │  │
│  │ (Appointment)│  │ (TimeSlot,   │  │    (Interfaces)      │  │
│  │   (Review)   │  │  Price, etc) │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │Domain Service│  │ Domain Errors│                            │
│  │              │  │              │                            │
│  └──────────────┘  └──────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     INFRASTRUCTURE LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Prisma ORM  │  │   External   │  │   Event Publisher    │  │
│  │  (Database)  │  │     APIs     │  │  (Message Queue)     │  │
│  │              │  │ (Stripe, etc)│  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │   Mappers    │  │    Email     │                            │
│  │ (Domain↔DB)  │  │     SMS      │                            │
│  └──────────────┘  └──────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Bounded Contexts (Domaines)

```
┌─────────────────────────────────────────────────────────────────┐
│                      LEBARBIER DOMAINS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   BOOKING    │  │     USER     │  │      CATALOG         │  │
│  │              │  │  MANAGEMENT  │  │  (Services/Products) │  │
│  │ - Appoint-   │  │              │  │                      │  │
│  │   ments      │  │ - Auth       │  │ - Services           │  │
│  │ - Queue      │  │ - Profiles   │  │ - Products           │  │
│  │ - Availability│ │ - Sessions   │  │ - Categories         │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│         ↕                ↕                      ↕                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │    ORDER     │  │   EMPLOYEE   │  │       REVIEW         │  │
│  │              │  │              │  │                      │  │
│  │ - Cart       │  │ - Profiles   │  │ - Service Reviews    │  │
│  │ - Orders     │  │ - Portfolio  │  │ - Product Reviews    │  │
│  │ - Tracking   │  │ - Stats      │  │ - Moderation         │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│         ↕                ↕                      ↕                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   LOYALTY    │  │ NOTIFICATION │  │      PAYMENT         │  │
│  │              │  │              │  │                      │  │
│  │ - Points     │  │ - Email      │  │ - Stripe             │  │
│  │ - Tiers      │  │ - SMS        │  │ - Orange Money       │  │
│  │ - Rewards    │  │ - Push       │  │ - Momo               │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│         ↕                                       ↕                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   CONTENT    │  │  ANALYTICS   │  │    SHARED KERNEL     │  │
│  │              │  │              │  │                      │  │
│  │ - Blog       │  │ - Events     │  │ - Database           │  │
│  │ - FAQ        │  │ - Logs       │  │ - Types              │  │
│  │ - Pages      │  │ - Reports    │  │ - Utils              │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Event-Driven Communication

```
┌────────────────────────────────────────────────────────────────┐
│                        EVENT BUS                                │
└────────────────────────────────────────────────────────────────┘
         ↑                    ↑                    ↑
         │                    │                    │
    [Publish]            [Publish]            [Publish]
         │                    │                    │
┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│    BOOKING     │   │     ORDER      │   │    PAYMENT     │
│                │   │                │   │                │
│ Events:        │   │ Events:        │   │ Events:        │
│ - Created      │   │ - Created      │   │ - Processed    │
│ - Confirmed    │   │ - Shipped      │   │ - Failed       │
│ - Cancelled    │   │ - Delivered    │   │ - Refunded     │
└────────────────┘   └────────────────┘   └────────────────┘
         │                    │                    │
    [Subscribe]          [Subscribe]          [Subscribe]
         │                    │                    │
         ↓                    ↓                    ↓
┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│ NOTIFICATION   │   │    LOYALTY     │   │   ANALYTICS    │
│                │   │                │   │                │
│ Handlers:      │   │ Handlers:      │   │ Handlers:      │
│ - Send Email   │   │ - Add Points   │   │ - Track Event  │
│ - Send SMS     │   │ - Update Tier  │   │ - Log Action   │
│ - Push Notif   │   │ - Grant Reward │   │ - Create Report│
└────────────────┘   └────────────────┘   └────────────────┘
```

## 📊 Use Case Flow (Example: Create Appointment)

```
┌─────────────────────────────────────────────────────────────────┐
│                   CREATE APPOINTMENT FLOW                        │
└─────────────────────────────────────────────────────────────────┘

1. Client Request
   │
   ├─→ POST /api/appointments
   │   Body: { employeeId, serviceId, date, ... }
   │
   ↓
2. API Route Handler
   │
   ├─→ Validate session (auth)
   ├─→ Parse & validate DTO (Zod)
   │
   ↓
3. Create Appointment Use Case
   │
   ├─→ Get service details (duration, price)
   ├─→ Check employee availability
   ├─→ Create Appointment entity
   │   └─→ Business rules validation
   ├─→ Save to repository
   │   └─→ PrismaRepository → Database
   ├─→ Publish AppointmentCreatedEvent
   │   └─→ Event Bus
   │
   ↓
4. Event Handlers (Async)
   │
   ├─→ NotificationHandler
   │   └─→ Send confirmation email
   │
   ├─→ LoyaltyHandler
   │   └─→ Add loyalty points
   │
   └─→ AnalyticsHandler
       └─→ Track booking event
   │
   ↓
5. Response
   │
   └─→ 201 Created + AppointmentResponseDTO
```

## 🗄️ Database Relations

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│     USER     │◄───────►│  APPOINTMENT │────────►│   SERVICE    │
│              │         │              │         │              │
│ - id         │   1:N   │ - id         │   N:1   │ - id         │
│ - email      │         │ - userId     │         │ - name       │
│ - role       │         │ - employeeId │         │ - price      │
└──────────────┘         │ - serviceId  │         │ - duration   │
       │                 │ - date       │         └──────────────┘
       │                 │ - status     │
       │                 └──────────────┘
       │                        │
       │                        │
       │                        │ 1:1
       │                        ↓
       │                 ┌──────────────┐
       │                 │    PAYMENT   │
       │                 │              │
       │                 │ - id         │
       │                 │ - amount     │
       │                 │ - status     │
       │                 └──────────────┘
       │
       │ 1:N
       ↓
┌──────────────┐         ┌──────────────┐
│    ORDER     │────────►│  ORDER ITEM  │
│              │   1:N   │              │
│ - id         │         │ - productId  │
│ - total      │         │ - quantity   │
│ - status     │         │ - price      │
└──────────────┘         └──────────────┘
```

## 🚀 Future Microservices Architecture

```
                    ┌──────────────────────┐
                    │    API GATEWAY       │
                    │   (Port 3000)        │
                    └──────────────────────┘
                              ↓
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ↓                     ↓                     ↓
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   BOOKING     │    │     USER      │    │   CATALOG     │
│   SERVICE     │    │   SERVICE     │    │   SERVICE     │
│  (Port 3001)  │    │  (Port 3002)  │    │  (Port 3003)  │
└───────────────┘    └───────────────┘    └───────────────┘
        ↓                     ↓                     ↓
        └─────────────────────┼─────────────────────┘
                              ↓
                    ┌──────────────────────┐
                    │   MESSAGE QUEUE      │
                    │  (RabbitMQ/Kafka)    │
                    └──────────────────────┘
                              ↓
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ↓                     ↓                     ↓
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  NOTIFICATION │    │    PAYMENT    │    │   ANALYTICS   │
│   SERVICE     │    │   SERVICE     │    │   SERVICE     │
│  (Port 3004)  │    │  (Port 3005)  │    │  (Port 3006)  │
└───────────────┘    └───────────────┘    └───────────────┘
```

## 📦 Deployment Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         PRODUCTION                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────┐         ┌────────────────────┐          │
│  │    VERCEL/AWS      │         │   PostgreSQL DB    │          │
│  │                    │────────►│   (Supabase/AWS)   │          │
│  │  - Next.js App     │         │                    │          │
│  │  - API Routes      │         └────────────────────┘          │
│  │  - SSR/SSG Pages   │                                          │
│  └────────────────────┘         ┌────────────────────┐          │
│           │                     │   Redis Cache      │          │
│           └────────────────────►│   (Upstash/AWS)    │          │
│                                 └────────────────────┘          │
│                                                                  │
│  ┌────────────────────┐         ┌────────────────────┐          │
│  │   CDN (Cloudflare) │         │   S3 Storage       │          │
│  │   - Static Assets  │         │   - Images         │          │
│  │   - Images         │         │   - Documents      │          │
│  └────────────────────┘         └────────────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔐 Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY LAYERS                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Layer 1: Edge Security (Cloudflare)                            │
│  ├─ DDoS Protection                                             │
│  ├─ WAF (Web Application Firewall)                              │
│  └─ Rate Limiting                                               │
│                                                                  │
│  Layer 2: Application Security (Next.js)                        │
│  ├─ Authentication (NextAuth.js)                                │
│  ├─ Authorization (RBAC)                                        │
│  ├─ Input Validation (Zod)                                      │
│  └─ CSRF Protection                                             │
│                                                                  │
│  Layer 3: Domain Security (Business Rules)                      │
│  ├─ Business Rule Validation                                    │
│  ├─ Domain Events Integrity                                     │
│  └─ Aggregate Consistency                                       │
│                                                                  │
│  Layer 4: Data Security (Database)                              │
│  ├─ Row Level Security (RLS)                                    │
│  ├─ Encryption at Rest                                          │
│  └─ Encrypted Connections (SSL/TLS)                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

**Note** : Ces diagrammes sont en ASCII art. Pour une version plus professionnelle, utilisez des outils comme :
- Draw.io / Lucidchart
- PlantUML
- Mermaid (intégré dans Markdown)
- Excalidraw
