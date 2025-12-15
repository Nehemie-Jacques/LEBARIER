# 📚 Guide Complet de la Structure du Projet LE BARBIER

> Ce document explique en détail l'organisation et le rôle de chaque dossier et fichier du projet.

---

## 📖 Table des matières

1. [Dossiers racine](#-dossiers-racine)
2. [Structure src/app](#-structure-srcapp)
3. [Composants réutilisables](#-composants-réutilisables)
4. [Logique métier](#-logique-métier)
5. [Flux de données](#-flux-de-données)

---

## 📂 Dossiers racine

### `/public` - Fichiers statiques ✨

**Rôle** : Tous les fichiers qui doivent être accessibles directement via l'URL sans transformation.

```
public/
├── site.webmanifest      → Configuration PWA (nom, icônes, couleurs)
├── robots.txt            → Instructions pour les moteurs de recherche
├── favicon.ico           → Icône dans l'onglet du navigateur
├── fonts/                → Polices de caractères personnalisées
├── icons/                → Icônes PWA (toutes les tailles)
└── images/               → Images fixes du site
    ├── gallery/          → Photos pour la galerie
    ├── hero/             → Images de bannière
    ├── services/         → Illustrations des services
    └── team/             → Photos de l'équipe
```

**Exemple d'utilisation** :
```tsx
// Accessible via /icons/icon-192x192.png
<Image src="/icons/icon-192x192.png" alt="Logo" />
```

---

### `/scripts` - Outils de développement 🛠️

**Rôle** : Scripts pour automatiser des tâches (NON déployés en production).

```
scripts/
├── backup-db.sh          → Sauvegarde automatique de la base de données
├── deploy.sh             → Déploiement sur le serveur
└── seed-db.ts            → Remplissage de données de test
```

**Utilisation** :
```bash
# Sauvegarder la BDD
./scripts/backup-db.sh

# Peupler avec des données
node scripts/seed-db.ts
```

---

### `/prisma` - Base de données 🗄️

**Rôle** : Tout ce qui concerne la structure et les données de la BDD.

```
prisma/
├── schema.prisma         → Définition des tables (User, Service, Appointment...)
├── seed.ts               → Données initiales (admin, services de base...)
└── migrations/           → Historique de toutes les modifications de schéma
```

**Workflow** :
1. Modifier `schema.prisma`
2. `npx prisma migrate dev --name add-loyalty`
3. Migration créée et appliquée automatiquement

---

### `/docs` - Documentation 📖

```
docs/
├── API.md                → Documentation de l'API REST
├── ARCHITECTURE.md       → Explications architecture
├── CONTRIBUTING.md       → Guide pour contribuer
└── DEPLOYMENT.md         → Guide de déploiement
```

---

### `/tests` - Tests automatisés 🧪

```
tests/
├── unit/                 → Tests de fonctions isolées
├── integration/          → Tests d'API et flux complets
└── e2e/                  → Tests utilisateur (Playwright)
```

---

## 📂 Structure `src/app`

### Principe du App Router

Next.js 14 utilise le **file-system routing** :
- Un dossier = une route URL
- `page.tsx` = page accessible
- `layout.tsx` = structure commune
- `(groupes)` = organisation sans impact sur l'URL

---

### Routes publiques

#### Page d'accueil

```
app/
├── page.tsx              → / (accueil)
├── layout.tsx            → Structure globale
├── loading.tsx           → Animation de chargement
├── error.tsx             → Page d'erreur
└── not-found.tsx         → 404
```

#### Groupe `(main)` - Pages marketing

```
(main)/
├── layout.tsx            → Header + Footer
├── about/                → /about
├── services/             → /services
├── team/                 → /team
├── gallery/              → /gallery
├── contact/              → /contact
└── blog/                 → /blog
    └── [slug]/           → /blog/article-titre (dynamique)
```

**Exemple** :
- Fichier : `app/(main)/about/page.tsx`
- URL : `https://lebarbier.com/about`

---

### Routes authentification

#### Groupe `(auth)`

```
(auth)/
├── login/                → /login
├── register/             → /register
├── forgot-password/      → /forgot-password
├── reset-password/       → /reset-password
└── verify-email/         → /verify-email
```

**Fonctionnalités** :
- Connexion email/mot de passe
- OAuth (Google, Facebook)
- Réinitialisation sécurisée
- Validation par email

---

### Routes réservation

#### `/booking` - Tunnel en 5 étapes

```
booking/
├── page.tsx              → Étape 1 : Choix du service
├── employee/             → Étape 2 : Sélection coiffeur
├── location/             → Étape 3 : Choix du salon
├── datetime/             → Étape 4 : Date et heure
├── payment/              → Étape 5 : Paiement
└── confirmation/         → Récapitulatif final
```

**Flux utilisateur** :
1. Je veux une "Coupe Classique"
2. Avec "Jean Dupont"
3. Au "Salon Centre-Ville"
4. Le "20 décembre à 14h"
5. Paiement → Confirmation

**État géré par** : `src/store/bookingStore.ts`

---

### Routes e-commerce

#### `/shop` - Boutique

```
shop/
├── page.tsx              → /shop (catalogue)
├── [slug]/               → /shop/shampoing-bio (produit)
├── cart/                 → /shop/cart (panier)
└── checkout/             → /shop/checkout
    ├── shipping/         → Adresse de livraison
    ├── payment/          → Paiement
    └── confirmation/     → Commande validée
```

**État géré par** : `src/store/cartStore.ts`

---

### Routes espace client

#### `/profile` - Compte client

```
profile/
├── layout.tsx            → Sidebar de navigation
├── page.tsx              → Vue d'ensemble
├── appointments/         → Historique rendez-vous
├── favorites/            → Coiffeurs favoris
├── loyalty/              → Points de fidélité
├── orders/               → Commandes boutique
└── settings/             → Paramètres compte
```

**Accès** : Réservé aux utilisateurs connectés (middleware).

---

### Routes espace employé

#### `/employee` - Dashboard employé

```
employee/
├── layout.tsx            → Layout avec menu employé
├── page.tsx              → Dashboard (résumé du jour)
├── appointments/         → Rendez-vous assignés
├── schedule/             → Planning et disponibilités
├── portfolio/            → Galerie de réalisations
└── stats/                → Statistiques personnelles
```

**Données** :
- Rendez-vous du jour
- Chiffre d'affaires personnel
- Nombre de clients
- Note moyenne

---

### Routes administration

#### `/admin` - Tableau de bord complet

```
admin/
├── layout.tsx            → Sidebar admin
├── page.tsx              → Dashboard (KPIs)
│
├── analytics/            → 📊 Statistiques avancées
│   ├── page.tsx          (graphiques, rapports)
│   └── reports/
│
├── appointments/         → 📅 Tous les rendez-vous
│   └── [id]/
│
├── users/                → 👥 Gestion clients
│   └── [id]/
│
├── employees/            → 👨‍💼 Gestion employés
│   └── [id]/
│
├── services/             → 💈 Services offerts
│   └── [id]/
│
├── products/             → 📦 Produits boutique
│   └── [id]/
│
├── orders/               → 🛍️ Commandes
│   └── [id]/
│
├── reviews/              → ⭐ Avis clients
│
├── marketing/            → 📧 Campagnes
│   ├── emails/
│   └── sms/
│
├── content/              → 📝 Contenu
│   ├── blog/
│   ├── gallery/
│   └── pages/
│
└── settings/             → ⚙️ Configuration
    ├── general/
    ├── payments/
    ├── notifications/
    └── security/
```

**Permissions** : Admin uniquement (vérifié par middleware).

---

### Routes API (Backend)

#### `/api` - Endpoints REST

```
api/
├── auth/                 → 🔐 Authentification
│   ├── [...nextauth]/    (NextAuth.js)
│   ├── register/
│   └── login/
│
├── appointments/         → 📅 CRUD Rendez-vous
│   ├── route.ts          (GET all, POST create)
│   ├── [id]/
│   │   └── route.ts      (GET, PUT, DELETE)
│   └── availability/     (créneaux libres)
│
├── services/             → 💈 CRUD Services
│   ├── route.ts
│   └── [id]/
│
├── employees/            → 👨‍💼 CRUD Employés
│   ├── route.ts
│   └── [id]/
│
├── products/             → 📦 CRUD Produits
├── orders/               → 🛍️ CRUD Commandes
├── reviews/              → ⭐ CRUD Avis
│
├── payments/             → 💳 Paiements
│   ├── stripe/           (cartes bancaires)
│   ├── orange-money/     (Orange Money)
│   └── momo/             (MTN)
│
├── notifications/        → 🔔 Notifications
│   ├── email/
│   └── sms/
│
├── loyalty/              → 🎁 Fidélité
├── chatbot/              → 🤖 IA (OpenAI)
├── upload/               → 📤 Upload (S3)
└── webhooks/             → 🔗 Webhooks
```

**Exemple d'appel** :
```typescript
// Frontend
const response = await fetch('/api/appointments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    serviceId: '123',
    employeeId: '456',
    datetime: '2025-12-20T14:00:00Z'
  })
});
```

---

## 🧩 Composants réutilisables

### `/src/components`

Organisation par **feature** (fonctionnalité) :

```
components/
├── ui/                   → Composants de base (boutons, inputs...)
├── layout/               → Structure de page (Header, Footer...)
├── home/                 → Sections de la page d'accueil
├── booking/              → Composants de réservation
├── admin/                → Composants admin
├── profile/              → Composants espace client
├── shop/                 → Composants e-commerce
├── services/             → Composants services
├── team/                 → Composants équipe
├── reviews/              → Composants avis
├── notifications/        → Composants notifications
├── chatbot/              → Widget chatbot
└── common/               → Composants génériques
```

### Exemple : `/components/ui` (shadcn/ui)

```
ui/
├── button.tsx            → Bouton personnalisable
├── card.tsx              → Carte de contenu
├── dialog.tsx            → Modale
├── input.tsx             → Champ de formulaire
├── select.tsx            → Menu déroulant
└── ...
```

**Utilisation** :
```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="lg">
  Réserver maintenant
</Button>
```

### Exemple : `/components/booking`

```
booking/
├── BookingStepper.tsx        → Indicateur d'étapes (1/5)
├── ServiceSelector.tsx       → Grille de sélection services
├── EmployeeSelector.tsx      → Carte employés
├── DateTimePicker.tsx        → Calendrier + créneaux
└── BookingSummary.tsx        → Récapitulatif
```

---

## 📚 Logique métier

### `/src/lib` - Utilitaires et intégrations

```
lib/
├── auth.ts               → Configuration NextAuth.js
├── prisma.ts             → Client Prisma (singleton)
├── utils.ts              → Fonctions helper
├── constants.ts          → Constantes globales
├── validations.ts        → Schémas Zod
│
├── analytics/            → Google Analytics
├── payments/             → Stripe, Orange Money, MTN
├── email/                → SendGrid, templates
├── sms/                  → Twilio
├── storage/              → AWS S3
└── chatbot/              → OpenAI
```

### Exemple : `lib/utils.ts`

```typescript
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF'
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long'
  }).format(date);
}
```

### Exemple : `lib/payments/stripe.ts`

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createPaymentIntent(amount: number) {
  return await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'xaf',
  });
}
```

---

### `/src/hooks` - React Hooks personnalisés

```
hooks/
├── useAuth.ts            → État utilisateur
├── useBooking.ts         → État réservation
└── useCart.ts            → État panier
```

**Exemple : `useAuth.ts`**

```typescript
export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    logout: () => signOut()
  };
}
```

**Utilisation** :
```tsx
const { user, isAuthenticated, logout } = useAuth();

if (!isAuthenticated) return <LoginPage />;
```

---

### `/src/store` - État global (Zustand)

```
store/
├── authStore.ts          → État utilisateur global
├── bookingStore.ts       → État processus réservation
└── cartStore.ts          → État panier d'achat
```

**Exemple : `bookingStore.ts`**

```typescript
import { create } from 'zustand';

export const useBookingStore = create((set) => ({
  service: null,
  employee: null,
  datetime: null,
  
  setService: (service) => set({ service }),
  setEmployee: (employee) => set({ employee }),
  setDatetime: (datetime) => set({ datetime }),
  
  reset: () => set({
    service: null,
    employee: null,
    datetime: null
  })
}));
```

---

### `/src/i18n` - Internationalisation

```
i18n/
├── config.ts             → Configuration
├── utils.ts              → Fonctions t(), changeLanguage()
└── locales/
    ├── fr.json           → Traductions français
    └── en.json           → Traductions anglais
```

**Exemple : `locales/fr.json`**

```json
{
  "common": {
    "welcome": "Bienvenue",
    "book_now": "Réserver maintenant"
  },
  "booking": {
    "step_1": "Choisissez votre service",
    "step_2": "Sélectionnez votre coiffeur"
  }
}
```

---

### `/src/types` - Types TypeScript

```
types/
├── models.ts             → Types métier (User, Service...)
├── api.ts                → Types réponses API
├── global.d.ts           → Types globaux
└── next-auth.d.ts        → Extension NextAuth
```

**Exemple : `models.ts`**

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CLIENT' | 'EMPLOYEE' | 'ADMIN';
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: 'HAIRCUT' | 'BEARD' | 'CARE';
}

export interface Appointment {
  id: string;
  serviceId: string;
  employeeId: string;
  clientId: string;
  datetime: Date;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}
```

---

## 🔄 Flux de données

### Exemple : Création d'un rendez-vous

```
1. Client → Formulaire booking
   └─ useBookingStore.ts (état temporaire)

2. Soumission → API
   └─ POST /api/appointments

3. API Route → Prisma
   └─ prisma.appointment.create()

4. BDD → PostgreSQL
   └─ Enregistrement

5. Notifications
   ├─ Email → SendGrid
   └─ SMS → Twilio

6. Retour → Client
   └─ Confirmation affichée
```

### Architecture en couches

```
┌─────────────────────────────────────┐
│         Interface (UI)              │  ← Components + Pages
├─────────────────────────────────────┤
│      État global (Store)            │  ← Zustand
├─────────────────────────────────────┤
│      API Routes (Backend)           │  ← app/api/
├─────────────────────────────────────┤
│      Logique métier (Lib)           │  ← lib/
├─────────────────────────────────────┤
│      ORM (Prisma)                   │  ← prisma/
├─────────────────────────────────────┤
│      Base de données                │  ← PostgreSQL
└─────────────────────────────────────┘
```

---

## 🎯 Résumé

### Règles d'organisation

1. **`/public`** → Fichiers statiques accessibles directement
2. **`/scripts`** → Outils de développement (non déployés)
3. **`/src/app`** → Routes et pages (file-system routing)
4. **`/src/components`** → Composants React par feature
5. **`/src/lib`** → Logique métier et intégrations
6. **`/src/hooks`** → Hooks personnalisés
7. **`/src/store`** → État global (Zustand)
8. **`/src/types`** → Définitions TypeScript

### Conventions de nommage

- **Composants** : `PascalCase.tsx` (ServiceCard.tsx)
- **Utilitaires** : `camelCase.ts` (formatPrice.ts)
- **Routes** : `kebab-case/` (forgot-password/)
- **Constantes** : `UPPER_SNAKE_CASE`

---

**Ce guide est un document vivant. N'hésitez pas à le mettre à jour au fur et à mesure de l'évolution du projet !**
