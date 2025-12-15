# 💈 LE BARBIER - L'Art de la Beauté Redéfini

> Application web moderne et complète pour la gestion d'un salon de coiffure premium avec système de réservation en ligne, boutique e-commerce et tableau de bord administrateur.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)

---

## 📋 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#️-stack-technologique)
- [Installation](#-installation)
- [Structure du projet](#-structure-du-projet-détaillée)
- [Configuration](#-configuration)
- [Scripts disponibles](#-scripts-disponibles)
- [Déploiement](#-déploiement)
- [Documentation](#-documentation)
- [Contribution](#-contribution)

---

## 🎯 Vue d'ensemble

**LE BARBIER** est une plateforme web complète qui digitalise l'expérience d'un salon de coiffure moderne. Elle offre trois interfaces distinctes :

1. **Interface Client** - Réservation, shopping, fidélité
2. **Interface Employé** - Planning, portfolio, statistiques
3. **Interface Admin** - Gestion complète du salon

### ✨ Points forts

- 🎨 Design premium et responsive
- ⚡ Performance optimale (Next.js 14 App Router)
- 🔒 Authentification sécurisée (NextAuth.js)
- 💳 Paiements multiples (Stripe, Mobile Money)
- 🤖 Assistant IA intégré (OpenAI)
- 🌍 Multi-langues (FR/EN)
- 📱 Progressive Web App (PWA)

---

## 🚀 Fonctionnalités

### 👥 Pour les Clients

#### Réservation de rendez-vous
- 📅 **Tunnel de réservation en 5 étapes**
  - Choix du service (coupe, barbe, soin...)
  - Sélection de l'employé préféré
  - Choix du salon (si multi-sites)
  - Sélection date et heure
  - Paiement et confirmation

#### E-commerce
- 🛒 **Boutique de produits capillaires**
  - Catalogue complet avec filtres
  - Panier d'achat dynamique
  - Processus de checkout sécurisé
  - Suivi de commande

#### Fidélité & Avantages
- ⭐ **Programme de points**
  - Accumulation de points à chaque visite
  - Récompenses et réductions exclusives
  - Historique détaillé

#### Communication
- 💬 **Chatbot IA** - Assistance 24/7 (OpenAI)
- 📧 **Notifications email** - Confirmations, rappels
- 📱 **SMS** - Rappels de rendez-vous (Twilio)
- 🔔 **Notifications push** - Promotions, actualités

### 💼 Pour les Employés

- 📅 **Planning intelligent** - Vue de tous les rendez-vous
- � **Profil personnel** - Informations et disponibilités
- 🖼️ **Portfolio** - Galerie de réalisations
- � **Statistiques** - CA personnel, nombre de clients
- 🔔 **Alertes temps réel** - Nouveaux rendez-vous

### 🔧 Pour les Administrateurs

#### Tableau de bord
- 📈 **Analytics en temps réel**
  - Chiffre d'affaires
  - Taux d'occupation
  - Produits les plus vendus
  - Tendances et rapports

#### Gestion complète
- 👥 **Utilisateurs** - Clients et employés
- � **Services** - Tarifs, durées, descriptions
- 📦 **Produits** - Stock, prix, catégories
- 💰 **Commandes** - Validation, expédition
- ⭐ **Avis** - Modération et réponses
- 📅 **Rendez-vous** - Vue globale, modifications

#### Marketing
- ✉️ **Campagnes email** - Newsletters, promotions
- � **Campagnes SMS** - Offres spéciales
- 🎨 **Gestion de contenu** - Blog, galerie, pages
- 🏷️ **Promotions** - Codes promo, réductions

#### Configuration
- ⚙️ **Paramètres généraux** - Horaires, coordonnées
- 💳 **Paiements** - Configuration des passerelles
- 🌐 **Localisation** - Traductions, devises
- 🔐 **Sécurité** - Rôles et permissions

---

## 🛠️ Stack Technologique

### Frontend
- **Framework** : [Next.js 14](https://nextjs.org/) (App Router)
- **Langage** : [TypeScript 5.0](https://www.typescriptlang.org/)
- **UI Library** : [React 18](https://react.dev/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Composants** : [Shadcn/ui](https://ui.shadcn.com/)
- **State Management** : [Zustand](https://zustand-demo.pmnd.rs/)
- **Forms** : React Hook Form + Zod

### Backend
- **Runtime** : Node.js
- **API** : Next.js API Routes (Serverless)
- **ORM** : [Prisma](https://www.prisma.io/)
- **Database** : PostgreSQL
- **Authentication** : [NextAuth.js](https://next-auth.js.org/)

### Services tiers
- **Paiements** :
  - 💳 [Stripe](https://stripe.com/) (Cartes bancaires)
  - 📱 Orange Money (Mobile Money)
  - 📱 MTN Mobile Money
- **Email** : [SendGrid](https://sendgrid.com/)
- **SMS** : [Twilio](https://www.twilio.com/)
- **Storage** : [AWS S3](https://aws.amazon.com/s3/)
- **IA** : [OpenAI API](https://openai.com/)
- **Analytics** : Google Analytics 4

### DevOps
- **Hébergement** : Vercel / AWS
- **CI/CD** : GitHub Actions
- **Monitoring** : Sentry
- **Testing** : Jest, React Testing Library, Playwright

---

## 📦 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn
- PostgreSQL 14+
- Compte AWS (pour S3)
- Comptes API (Stripe, SendGrid, Twilio, OpenAI)

### Étapes d'installation

#### 1. **Cloner le repository**

```bash
git clone https://github.com/Nehemie-Jacques/LEBARBIER.git
cd LEBARBIER
```

#### 2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
```

#### 3. **Configurer les variables d'environnement**

Créez un fichier `.env.local` à la racine :

```bash
cp .env.example .env.local
```

Remplissez toutes les variables nécessaires :

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lebarbier"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-genere"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# SendGrid
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="noreply@lebarbier.com"

# Twilio
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+1234567890"

# AWS S3
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="us-east-1"
AWS_S3_BUCKET="lebarbier-uploads"

# OpenAI
OPENAI_API_KEY="sk-..."

# Mobile Money (Config selon votre pays)
ORANGE_MONEY_API_KEY="..."
MOMO_API_KEY="..."
```

#### 4. **Initialiser la base de données**

```bash
# Créer les tables
npx prisma migrate dev

# Peupler avec des données de test
npx prisma db seed
```

#### 5. **Générer le client Prisma**

```bash
npx prisma generate
```

#### 6. **Lancer le serveur de développement**

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### 🔐 Comptes de test

Après le seed, vous pouvez vous connecter avec :

**Admin**
- Email : `admin@lebarbier.com`
- Mot de passe : `Admin123!`

**Employé**
- Email : `employee@lebarbier.com`
- Mot de passe : `Employee123!`

**Client**
- Email : `client@lebarbier.com`
- Mot de passe : `Client123!`

---

## 📁 Structure du Projet Détaillée

### Vue d'ensemble de l'arborescence

```
LEBARBIER/
├── 📄 Fichiers de configuration (racine)
├── 📂 docs/              → Documentation technique
├── 📂 prisma/            → Base de données
├── 📂 public/            → Fichiers statiques
├── 📂 scripts/           → Scripts utilitaires
├── 📂 src/               → Code source principal
└── 📂 tests/             → Tests automatisés
```

---

### 📂 **`/public`** - Fichiers statiques

**Rôle** : Fichiers servis directement sans transformation, accessibles via l'URL racine.

```
public/
├── site.webmanifest      → Configuration PWA
├── robots.txt            → Instructions SEO pour robots
├── favicon.ico           → Icône du site
├── fonts/                → Polices personnalisées
├── icons/                → Icônes PWA (72x72 à 512x512)
│   ├── icon-192x192.png
│   └── icon-512x512.png
└── images/               → Images statiques
    ├── gallery/          → Photos galerie
    ├── hero/             → Images de hero section
    ├── services/         → Illustrations services
    └── team/             → Photos équipe
```

**Utilisation** :
```tsx
// Accès direct dans le code
<Image src="/icons/icon-192x192.png" alt="Logo" />
<link rel="manifest" href="/site.webmanifest" />
```

---

### 📂 **`/scripts`** - Scripts utilitaires

**Rôle** : Scripts de développement et maintenance (NON déployés en production).

```
scripts/
├── backup-db.sh          → Sauvegarde automatique de la BDD
├── deploy.sh             → Script de déploiement
└── seed-db.ts            → Peuplement de données de test
```

**Exemples d'utilisation** :
```bash
# Sauvegarder la base de données
./scripts/backup-db.sh

# Peupler avec des données
node scripts/seed-db.ts
```

---

### 📂 **`/prisma`** - Configuration Base de données

**Rôle** : Schéma de base de données, migrations et seeds.

```
prisma/
├── schema.prisma         → Définition des modèles (User, Service, Appointment...)
├── seed.ts               → Données initiales
└── migrations/           → Historique des migrations
    ├── 20231201_init/
    └── 20231215_add_loyalty/
```

**Commandes clés** :
```bash
npx prisma migrate dev    # Créer une migration
npx prisma db seed        # Peupler la BDD
npx prisma studio         # Interface visuelle
```

---

### 📂 **`/src`** - Code source principal

#### **`/src/app`** - Routes et pages (Next.js App Router)

Le dossier `app` utilise le **file-system routing** de Next.js 14.

##### 🏠 **Page d'accueil**

```
app/
├── page.tsx              → Page d'accueil (/)
├── layout.tsx            → Layout global (Header, Footer)
├── loading.tsx           → État de chargement global
├── error.tsx             → Page d'erreur globale
└── not-found.tsx         → Page 404
```

##### 🔐 **`app/(auth)`** - Authentification

**Note** : Les `()` créent un groupe de routes sans affecter l'URL.

```
(auth)/
├── login/                → /login
│   └── page.tsx
├── register/             → /register
│   └── page.tsx
├── forgot-password/      → /forgot-password
│   └── page.tsx
├── reset-password/       → /reset-password
│   └── page.tsx
└── verify-email/         → /verify-email
    └── page.tsx
```

**Fonctionnalités** :
- Connexion avec email/mot de passe
- Inscription avec validation email
- Réinitialisation de mot de passe
- OAuth (Google, Facebook)

##### 🏠 **`app/(main)`** - Pages publiques

```
(main)/
├── layout.tsx            → Layout public (navigation, footer)
├── about/                → /about - À propos
├── blog/                 → /blog - Articles
│   └── [slug]/           → /blog/article-titre (dynamique)
├── contact/              → /contact - Formulaire
├── gallery/              → /gallery - Galerie photos
├── services/             → /services - Liste services
│   └── [slug]/           → /services/coupe-classique
└── team/                 → /team - Équipe
```

##### 📅 **`app/booking`** - Réservation (Wizard multi-étapes)

```
booking/
├── page.tsx              → Étape 1 : Choix du service
├── employee/             → Étape 2 : Sélection coiffeur
│   └── page.tsx
├── location/             → Étape 3 : Choix du salon
│   └── page.tsx
├── datetime/             → Étape 4 : Date et heure
│   └── page.tsx
├── payment/              → Étape 5 : Paiement
│   └── page.tsx
└── confirmation/         → Confirmation finale
    └── page.tsx
```

**Flux** :
1. Client choisit un service (coupe, barbe...)
2. Sélectionne son coiffeur préféré
3. Choisit le salon (si multi-sites)
4. Définit date/heure
5. Paie et confirme

##### 💼 **`app/employee`** - Espace Employé

**Accès** : Réservé aux employés connectés.

```
employee/
├── layout.tsx            → Layout avec sidebar employé
├── page.tsx              → Dashboard employé
├── appointments/         → Rendez-vous du jour
│   └── page.tsx
├── schedule/             → Planning et disponibilités
│   └── page.tsx
├── portfolio/            → Galerie de réalisations
│   ├── page.tsx
│   └── [id]/             → Détail d'une réalisation
├── stats/                → Statistiques personnelles
│   └── page.tsx          (CA, nombre de clients, avis)
```

##### 👤 **`app/profile`** - Espace Client

**Accès** : Réservé aux clients connectés.

```
profile/
├── layout.tsx            → Layout avec sidebar profil
├── page.tsx              → Vue d'ensemble
├── appointments/         → Historique rendez-vous
│   ├── page.tsx
│   └── [id]/             → Détail d'un rendez-vous
├── favorites/            → Coiffeurs/services favoris
│   └── page.tsx
├── loyalty/              → Points de fidélité
│   └── page.tsx
├── orders/               → Commandes e-shop
│   ├── page.tsx
│   └── [id]/             → Détail commande
└── settings/             → Paramètres compte
    └── page.tsx
```

##### 🛒 **`app/shop`** - E-commerce

```
shop/
├── page.tsx              → Catalogue produits
├── [slug]/               → /shop/shampoing-bio (page produit)
│   └── page.tsx
├── cart/                 → /shop/cart - Panier
│   └── page.tsx
└── checkout/             → /shop/checkout - Paiement
    ├── page.tsx
    ├── shipping/         → Livraison
    ├── payment/          → Paiement
    └── confirmation/     → Confirmation
```

##### 🔧 **`app/admin`** - Tableau de bord Admin

**Accès** : Réservé aux administrateurs.

```
admin/
├── layout.tsx            → Layout admin (sidebar navigation)
├── page.tsx              → Dashboard principal
│
├── analytics/            → 📊 Statistiques & rapports
│   ├── page.tsx          (CA, taux d'occupation, tendances)
│   └── reports/
│
├── appointments/         → 📅 Gestion rendez-vous
│   ├── page.tsx          (liste, calendrier, modifications)
│   └── [id]/
│
├── users/                → 👥 Gestion clients
│   ├── page.tsx          (liste, filtres, exports)
│   └── [id]/
│
├── employees/            → 👨‍💼 Gestion employés
│   ├── page.tsx          (ajout, modification, plannings)
│   └── [id]/
│
├── services/             → 💈 Gestion services
│   ├── page.tsx          (CRUD services, tarifs, durées)
│   └── [id]/
│
├── products/             → 📦 Gestion produits
│   ├── page.tsx          (stock, prix, catégories)
│   └── [id]/
│
├── orders/               → 🛍️ Gestion commandes
│   ├── page.tsx          (validation, expédition, suivi)
│   └── [id]/
│
├── reviews/              → ⭐ Modération avis
│   └── page.tsx          (réponses, signalements)
│
├── marketing/            → 📧 Campagnes marketing
│   ├── emails/           (newsletters, promotions)
│   └── sms/              (campagnes SMS)
│
├── content/              → 📝 Gestion contenu
│   ├── blog/             (articles)
│   ├── gallery/          (photos)
│   └── pages/            (pages statiques)
│
└── settings/             → ⚙️ Configuration
    ├── general/          (infos salon, horaires)
    ├── payments/         (config passerelles)
    ├── notifications/    (templates email/SMS)
    └── security/         (rôles, permissions)
```

##### 🔌 **`app/api`** - Backend API Routes

**Rôle** : Points d'API REST pour toutes les opérations CRUD.

```
api/
├── auth/                 → 🔐 Authentification
│   ├── [...nextauth]/    (NextAuth handlers)
│   ├── register/
│   ├── login/
│   └── logout/
│
├── appointments/         → 📅 CRUD Rendez-vous
│   ├── route.ts          (GET, POST)
│   ├── [id]/
│   │   └── route.ts      (GET, PUT, DELETE)
│   └── availability/     (créneaux disponibles)
│
├── services/             → 💈 CRUD Services
│   ├── route.ts
│   └── [id]/
│
├── employees/            → 👨‍💼 CRUD Employés
│   ├── route.ts
│   ├── [id]/
│   └── schedule/         (disponibilités)
│
├── products/             → 📦 CRUD Produits
│   ├── route.ts
│   └── [id]/
│
├── orders/               → 🛍️ CRUD Commandes
│   ├── route.ts
│   └── [id]/
│
├── reviews/              → ⭐ CRUD Avis
│   ├── route.ts
│   └── [id]/
│
├── payments/             → 💳 Paiements
│   ├── stripe/
│   ├── orange-money/
│   └── momo/
│
├── notifications/        → 🔔 Notifications
│   ├── email/
│   └── sms/
│
├── loyalty/              → 🎁 Programme fidélité
│   ├── points/
│   └── rewards/
│
├── chatbot/              → 🤖 Chatbot IA
│   └── route.ts          (OpenAI integration)
│
├── upload/               → 📤 Upload fichiers
│   └── route.ts          (AWS S3)
│
└── webhooks/             → 🔗 Webhooks
    ├── stripe/
    └── sendgrid/
```

**Exemple d'utilisation** :
```typescript
// Frontend
const response = await fetch('/api/appointments', {
  method: 'POST',
  body: JSON.stringify({ serviceId, employeeId, datetime })
});
```

---

#### **`/src/components`** - Composants React réutilisables

**Organisation par feature** pour faciliter la maintenance.

```
components/
├── ui/                   → 🎨 Composants UI de base (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── select.tsx
│   └── ...
│
├── layout/               → 🏗️ Structure de page
│   ├── Header.tsx        (navigation, menu)
│   ├── Footer.tsx        (liens, réseaux sociaux)
│   ├── Sidebar.tsx       (navigation latérale)
│   ├── MobileMenu.tsx    (menu burger)
│   └── Breadcrumb.tsx    (fil d'Ariane)
│
├── home/                 → 🏠 Sections page d'accueil
│   ├── HeroSection.tsx   (bannière principale)
│   ├── ServicesGrid.tsx  (grille services)
│   ├── TeamCarousel.tsx  (carrousel équipe)
│   ├── TestimonialsCarousel.tsx (avis clients)
│   ├── GallerySection.tsx
│   ├── LoyaltySection.tsx
│   └── CTASection.tsx    (call-to-action)
│
├── booking/              → 📅 Composants réservation
│   ├── BookingStepper.tsx (wizard étapes)
│   ├── ServiceSelector.tsx
│   ├── EmployeeSelector.tsx
│   ├── DateTimePicker.tsx
│   └── BookingSummary.tsx
│
├── admin/                → 🔧 Composants admin
│   ├── AdminSidebar.tsx
│   ├── DashboardStats.tsx (KPIs)
│   ├── DataTable.tsx     (tableau générique)
│   └── ChartWidget.tsx
│
├── profile/              → 👤 Composants profil
│   ├── ProfileSidebar.tsx
│   ├── AppointmentCard.tsx
│   └── LoyaltyProgress.tsx
│
├── shop/                 → 🛒 Composants e-commerce
│   ├── ProductCard.tsx
│   ├── CartDrawer.tsx    (panier latéral)
│   ├── CheckoutForm.tsx
│   └── OrderTracking.tsx
│
├── services/             → 💈 Composants services
│   ├── ServiceCard.tsx
│   └── ServiceDetails.tsx
│
├── team/                 → 👥 Composants équipe
│   ├── EmployeeCard.tsx
│   └── EmployeeProfile.tsx
│
├── reviews/              → ⭐ Composants avis
│   ├── ReviewCard.tsx
│   ├── ReviewForm.tsx
│   └── StarRating.tsx
│
├── notifications/        → 🔔 Composants notifications
│   ├── NotificationBell.tsx
│   └── NotificationItem.tsx
│
├── chatbot/              → 🤖 Chatbot
│   └── ChatWidget.tsx    (widget IA flottant)
│
└── common/               → 🔄 Composants génériques
    ├── LoadingSpinner.tsx
    ├── ErrorBoundary.tsx
    ├── EmptyState.tsx
    └── Pagination.tsx
```

**Exemple** :
```tsx
// Utilisation
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/services/ServiceCard';
```

---

#### **`/src/lib`** - Logique métier et utilitaires

**Rôle** : Fonctions réutilisables, configurations, intégrations tierces.

```
lib/
├── auth.ts               → 🔐 Configuration NextAuth
│   (stratégies, callbacks, JWT)
│
├── prisma.ts             → 🗄️ Client Prisma singleton
│   (connexion BDD)
│
├── utils.ts              → 🛠️ Fonctions utilitaires
│   (formatDate, classNames, slugify...)
│
├── constants.ts          → 📋 Constantes globales
│   (ROLES, STATUS, DURATIONS...)
│
├── validations.ts        → ✅ Schémas de validation
│   (Zod schemas pour formulaires)
│
├── analytics/            → 📊 Analytics
│   └── google-analytics.ts
│
├── payments/             → 💳 Intégrations paiement
│   ├── stripe.ts         (cartes bancaires)
│   ├── orange-money.ts   (Orange Money)
│   └── momo.ts           (MTN Mobile Money)
│
├── email/                → 📧 Envoi d'emails
│   ├── sendgrid.ts       (client SendGrid)
│   ├── send-welcome.ts   (email bienvenue)
│   ├── send-password-reset.ts
│   └── templates/        (templates HTML)
│
├── sms/                  → 📱 Envoi SMS
│   └── twilio.ts         (client Twilio)
│
├── storage/              → 💾 Stockage fichiers
│   └── s3.ts             (AWS S3 client)
│
└── chatbot/              → 🤖 Chatbot IA
    └── openai.ts         (client OpenAI)
```

**Exemples** :
```typescript
// lib/utils.ts
export function formatPrice(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF'
  }).format(amount);
}

// lib/email/send-welcome.ts
export async function sendWelcomeEmail(email: string, name: string) {
  // Logique SendGrid
}
```

---

#### **`/src/hooks`** - React Hooks personnalisés

**Rôle** : Logique réutilisable sous forme de hooks.

```
hooks/
├── useAuth.ts            → 🔐 Authentification
│   (user, login, logout, isAuthenticated)
│
├── useBooking.ts         → 📅 État réservation
│   (service, employee, datetime, goToNextStep)
│
└── useCart.ts            → 🛒 Gestion panier
    (items, addToCart, removeFromCart, total)
```

**Exemple** :
```typescript
// hooks/useAuth.ts
export function useAuth() {
  const { data: session } = useSession();
  return {
    user: session?.user,
    isAuthenticated: !!session,
    logout: () => signOut()
  };
}

// Utilisation
const { user, isAuthenticated } = useAuth();
```

---

#### **`/src/store`** - État global (Zustand)

**Rôle** : Gestion de l'état partagé entre composants.

```
store/
├── authStore.ts          → 🔐 État utilisateur
│   (user, token, isLoggedIn)
│
├── bookingStore.ts       → 📅 État réservation
│   (currentStep, selectedService, selectedEmployee...)
│
└── cartStore.ts          → 🛒 État panier
    (items, total, addItem, removeItem)
```

**Exemple** :
```typescript
// store/cartStore.ts
export const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => ({
    items: [...state.items, product]
  })),
  total: () => state.items.reduce((sum, item) => sum + item.price, 0)
}));
```

---

#### **`/src/i18n`** - Internationalisation

**Rôle** : Système multi-langues (FR/EN).

```
i18n/
├── config.ts             → Configuration i18next
├── utils.ts              → Fonctions t(), changeLanguage()
└── locales/              → Fichiers de traduction
    ├── fr.json           (français)
    └── en.json           (anglais)
```

**Exemple** :
```json
// locales/fr.json
{
  "common": {
    "welcome": "Bienvenue",
    "book_now": "Réserver maintenant"
  }
}
```

```typescript
// Utilisation
import { useTranslation } from '@/i18n/utils';

const { t } = useTranslation();
<h1>{t('common.welcome')}</h1>
```

---

#### **`/src/types`** - Types TypeScript

**Rôle** : Définitions de types pour tout le projet.

```
types/
├── models.ts             → Types métier (User, Service, Appointment...)
├── api.ts                → Types réponses API
├── global.d.ts           → Types globaux
└── next-auth.d.ts        → Extension types NextAuth
```

**Exemple** :
```typescript
// types/models.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CLIENT' | 'EMPLOYEE' | 'ADMIN';
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // en minutes
}
```

---

#### **`/src/styles`** - Styles globaux

```
styles/
└── globals.css           → Variables CSS, Tailwind, reset
```

**Contenu** :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #C9A961;  /* Or */
  --color-secondary: #2C3E50; /* Bleu foncé */
}
```

---

#### **`/src/middleware.ts`** - Middleware Next.js

**Rôle** : S'exécute avant chaque requête (protection routes, redirections, i18n).

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Protéger les routes admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('next-auth.session-token');
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: ['/admin/:path*', '/employee/:path*', '/profile/:path*']
};
```

---

### 📂 **`/docs`** - Documentation technique

```
docs/
├── API.md                → Documentation API REST
├── ARCHITECTURE.md       → Architecture du projet
├── CONTRIBUTING.md       → Guide contribution
└── DEPLOYMENT.md         → Guide déploiement
```

---

### 📂 **`/tests`** - Tests automatisés

```
tests/
├── unit/                 → Tests unitaires (fonctions)
├── integration/          → Tests intégration (API)
└── e2e/                  → Tests end-to-end (Playwright)
```

---

## 🎯 Résumé visuel de l'architecture

```
┌─────────────────────────────────────────────────────┐
│                  LEBARBIER APP                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  👥 CLIENTS          💼 EMPLOYÉS       🔧 ADMINS   │
│     ↓                    ↓                ↓        │
│  ┌────────┐         ┌────────┐       ┌────────┐  │
│  │ Public │         │Employee│       │ Admin  │  │
│  │ Pages  │         │  Area  │       │  Panel │  │
│  └────────┘         └────────┘       └────────┘  │
│       ↓                  ↓                ↓        │
│  ┌──────────────────────────────────────────┐    │
│  │         Next.js App Router              │    │
│  │         (src/app/)                       │    │
│  └──────────────────────────────────────────┘    │
│       ↓                                           │
│  ┌──────────────────────────────────────────┐    │
│  │         API Routes                       │    │
│  │         (src/app/api/)                   │    │
│  └──────────────────────────────────────────┘    │
│       ↓                                           │
│  ┌──────────────────────────────────────────┐    │
│  │         Prisma ORM                       │    │
│  └──────────────────────────────────────────┘    │
│       ↓                                           │
│  ┌──────────────────────────────────────────┐    │
│  │         PostgreSQL Database              │    │
│  └──────────────────────────────────────────┘    │
│                                                   │
│  Services tiers:                                 │
│  💳 Stripe | 📧 SendGrid | 📱 Twilio            │
│  ☁️ AWS S3 | 🤖 OpenAI                           │
└─────────────────────────────────────────────────┘
```

---

## ⚙️ Configuration

### Variables d'environnement requises

Créez un fichier `.env.local` avec les variables suivantes :

#### Base de données
```env
DATABASE_URL="postgresql://user:password@localhost:5432/lebarbier"
```

#### NextAuth.js
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genere-avec-openssl-rand-base64-32"
```

#### Stripe (Paiements cartes)
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

#### SendGrid (Emails)
```env
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="noreply@lebarbier.com"
SENDGRID_FROM_NAME="LE BARBIER"
```

#### Twilio (SMS)
```env
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+1234567890"
```

#### AWS S3 (Stockage)
```env
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="us-east-1"
AWS_S3_BUCKET="lebarbier-uploads"
```

#### OpenAI (Chatbot)
```env
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4"
```

#### Mobile Money
```env
# Orange Money
ORANGE_MONEY_API_KEY="..."
ORANGE_MONEY_MERCHANT_KEY="..."

# MTN Mobile Money
MOMO_API_USER="..."
MOMO_API_KEY="..."
MOMO_SUBSCRIPTION_KEY="..."
```

#### Google Analytics
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."
```

---

## 🛠️ Scripts disponibles

### Développement
```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Build de production
npm run start        # Démarrer le serveur de production
npm run lint         # Vérifier le code (ESLint)
npm run format       # Formater le code (Prettier)
```

### Base de données
```bash
npx prisma studio           # Interface visuelle de la BDD
npx prisma migrate dev      # Créer et appliquer une migration
npx prisma migrate reset    # Reset complet de la BDD
npx prisma db seed          # Peupler avec des données de test
npx prisma generate         # Générer le client Prisma
npx prisma db push          # Push du schéma (dev uniquement)
```

### Tests
```bash
npm run test              # Tous les tests
npm run test:unit         # Tests unitaires
npm run test:integration  # Tests d'intégration
npm run test:e2e          # Tests end-to-end
npm run test:watch        # Mode watch
npm run test:coverage     # Rapport de couverture
```

### Utilitaires
```bash
npm run analyze           # Analyser le bundle
npm run type-check        # Vérifier les types TypeScript
./scripts/backup-db.sh    # Sauvegarder la BDD
./scripts/deploy.sh       # Déployer (production)
```

---

## 🚀 Déploiement

### Option 1 : Vercel (Recommandé)

#### Déploiement automatique via Git

1. **Connecter votre repository GitHub**
   - Allez sur [vercel.com](https://vercel.com)
   - Importez votre repo `LEBARBIER`

2. **Configurer les variables d'environnement**
   - Dans Vercel Dashboard → Settings → Environment Variables
   - Ajoutez toutes les variables de `.env.local`

3. **Configurer la base de données**
   - Utilisez [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
   - Ou connectez votre PostgreSQL externe

4. **Déployer**
   ```bash
   git push origin main
   # Vercel déploie automatiquement
   ```

#### Déploiement via CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2 : AWS / DigitalOcean / VPS

Voir le guide détaillé : [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

#### Étapes principales

1. **Setup serveur Ubuntu**
```bash
# Installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PostgreSQL
sudo apt install postgresql postgresql-contrib

# Installer PM2 (process manager)
sudo npm install -g pm2
```

2. **Cloner et configurer**
```bash
git clone https://github.com/Nehemie-Jacques/LEBARBIER.git
cd LEBARBIER
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env.production
nano .env.production
# Remplir toutes les variables
```

4. **Build et démarrage**
```bash
npm run build
pm2 start npm --name "lebarbier" -- start
pm2 save
pm2 startup
```

5. **Configurer Nginx (reverse proxy)**
```nginx
server {
    listen 80;
    server_name lebarbier.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

6. **SSL avec Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d lebarbier.com
```

### Configuration de production

#### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lebarbier-uploads.s3.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Optimisations
  swcMinify: true,
  compress: true,
};

module.exports = nextConfig;
```

### Monitoring et maintenance

```bash
# Logs PM2
pm2 logs lebarbier

# Redémarrer l'application
pm2 restart lebarbier

# Mise à jour
git pull origin main
npm install
npm run build
pm2 restart lebarbier

# Backup automatique BDD (cron)
0 2 * * * /home/user/LEBARBIER/scripts/backup-db.sh
```

---

## 📊 Monitoring & Analytics

### Google Analytics
- Suivi des pages vues
- Événements personnalisés (réservations, achats)
- Entonnoirs de conversion

### Sentry (Monitoring d'erreurs)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## 📖 Documentation

### Documentation technique complète

- 📘 **[API Documentation](docs/API.md)** - Endpoints, schémas, exemples
- 🏗️ **[Architecture](docs/ARCHITECTURE.md)** - Design patterns, flux de données
- 🤝 **[Contributing Guide](docs/CONTRIBUTING.md)** - Comment contribuer
- 🚀 **[Deployment Guide](docs/DEPLOYMENT.md)** - Guides de déploiement détaillés

### Guides rapides

#### Créer un nouveau service
```typescript
// Dans Prisma Studio ou via API
POST /api/services
{
  "name": "Coupe Classique",
  "description": "Coupe aux ciseaux traditionnelle",
  "price": 15000,
  "duration": 30,
  "category": "HAIRCUT"
}
```

#### Ajouter un employé
```typescript
POST /api/employees
{
  "email": "coiffeur@lebarbier.com",
  "name": "Jean Dupont",
  "specialties": ["HAIRCUT", "BEARD"],
  "schedule": {
    "monday": { "start": "09:00", "end": "18:00" }
  }
}
```

#### Configurer les paiements Mobile Money
```typescript
// lib/payments/orange-money.ts
export async function initiateOrangeMoneyPayment(amount: number, phone: string) {
  // Configuration selon votre pays
}
```

---

## 🧪 Tests

### Structure des tests

```
tests/
├── unit/
│   ├── lib/
│   │   ├── utils.test.ts
│   │   └── validations.test.ts
│   └── components/
│       └── ServiceCard.test.tsx
│
├── integration/
│   └── api/
│       ├── appointments.test.ts
│       └── auth.test.ts
│
└── e2e/
    ├── booking-flow.spec.ts
    ├── checkout-flow.spec.ts
    └── admin-dashboard.spec.ts
```

### Exemples de tests

#### Test unitaire (Jest)
```typescript
// tests/unit/lib/utils.test.ts
import { formatPrice } from '@/lib/utils';

describe('formatPrice', () => {
  it('should format price correctly', () => {
    expect(formatPrice(15000)).toBe('15 000 XAF');
  });
});
```

#### Test d'intégration (API)
```typescript
// tests/integration/api/appointments.test.ts
import { POST } from '@/app/api/appointments/route';

describe('POST /api/appointments', () => {
  it('should create appointment', async () => {
    const response = await POST({
      serviceId: '123',
      employeeId: '456',
      datetime: '2025-12-20T10:00:00Z'
    });
    expect(response.status).toBe(201);
  });
});
```

#### Test E2E (Playwright)
```typescript
// tests/e2e/booking-flow.spec.ts
import { test, expect } from '@playwright/test';

test('complete booking flow', async ({ page }) => {
  await page.goto('/booking');
  await page.click('text=Coupe Classique');
  await page.click('text=Jean Dupont');
  // ... suite du test
  await expect(page).toHaveURL('/booking/confirmation');
});
```

### Lancer les tests

```bash
# Tous les tests
npm run test

# Tests spécifiques
npm run test:unit           # Unitaires
npm run test:integration    # Intégration
npm run test:e2e            # End-to-end

# Mode watch (développement)
npm run test:watch

# Couverture de code
npm run test:coverage
```

---

## 🔐 Sécurité

### Authentification
- **NextAuth.js** avec JWT
- Hachage bcrypt pour mots de passe
- Validation email obligatoire
- Rate limiting sur endpoints sensibles

### Protection des routes
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### Validation des données
```typescript
// lib/validations.ts (Zod)
export const appointmentSchema = z.object({
  serviceId: z.string().uuid(),
  employeeId: z.string().uuid(),
  datetime: z.string().datetime(),
});
```

### Variables sensibles
- ❌ Jamais de secrets dans le code
- ✅ Utilisation de variables d'environnement
- ✅ `.env.local` dans `.gitignore`

---

## � Debugging

### Logs de développement

```typescript
// Activer les logs détaillés
DEBUG=* npm run dev

// Logs Prisma
DEBUG=prisma:* npm run dev
```

### Outils utiles

```bash
# Inspecter la BDD
npx prisma studio

# Analyser le bundle Next.js
npm run analyze

# Vérifier les types
npm run type-check
```

### Erreurs courantes

#### "PrismaClient is unable to connect"
```bash
# Vérifier DATABASE_URL
echo $DATABASE_URL

# Tester la connexion
npx prisma db pull
```

#### "Module not found"
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

#### "Port 3000 already in use"
```bash
# Trouver et tuer le processus
lsof -ti:3000 | xargs kill -9
```

---

## 🤝 Contribution

Nous accueillons volontiers les contributions ! 🎉

### Comment contribuer

1. **Fork le projet**
```bash
git clone https://github.com/votre-username/LEBARBIER.git
```

2. **Créer une branche**
```bash
git checkout -b feature/ma-fonctionnalite
```

3. **Faire vos modifications**
```bash
# Respecter les conventions de code
npm run lint
npm run format
```

4. **Tester**
```bash
npm run test
```

5. **Commit avec des messages clairs**
```bash
git commit -m "feat: ajouter système de notation 5 étoiles"
```

6. **Push et créer une Pull Request**
```bash
git push origin feature/ma-fonctionnalite
```

### Conventions de code

#### Commits (Conventional Commits)
```
feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: formatage
refactor: refactoring
test: ajout de tests
chore: tâches de maintenance
```

#### Style de code
- **TypeScript** obligatoire
- **ESLint** + **Prettier** configurés
- Composants fonctionnels avec hooks
- Props typées avec interfaces

#### Nommage
```typescript
// Composants : PascalCase
export function ServiceCard() {}

// Fonctions : camelCase
export function formatPrice() {}

// Constantes : UPPER_SNAKE_CASE
export const API_BASE_URL = '...';

// Types : PascalCase
export interface UserProfile {}
```

### Code review

Toutes les PRs sont reviewées selon :
- ✅ Code propre et lisible
- ✅ Tests passants
- ✅ Documentation à jour
- ✅ Respect des conventions
- ✅ Pas de régression

---

## 📝 Roadmap

### Version 1.0 (Actuelle)
- ✅ Système de réservation complet
- ✅ E-commerce
- ✅ Tableau de bord admin
- ✅ Paiements multiples
- ✅ Multi-langues (FR/EN)

### Version 1.1 (Q1 2026)
- 🔄 Application mobile (React Native)
- 🔄 Système de visioconférence
- 🔄 Marketplace de produits
- 🔄 Programme d'affiliation

### Version 2.0 (Q2 2026)
- 📅 Multi-salons (franchises)
- 📅 API publique pour intégrations
- 📅 Thèmes personnalisables
- 📅 White-label solution

---

## 🙏 Remerciements

### Technologies et outils
- [Next.js](https://nextjs.org/) - Framework React
- [Prisma](https://www.prisma.io/) - ORM moderne
- [Shadcn/ui](https://ui.shadcn.com/) - Composants UI
- [Vercel](https://vercel.com/) - Hébergement

### Communauté
- Merci à tous les contributeurs
- La communauté Next.js pour le support
- Les early adopters pour leurs retours

### Services partenaires
- Stripe pour les paiements
- SendGrid pour les emails
- Twilio pour les SMS
- OpenAI pour l'IA

---

## 📞 Support & Contact

### Besoin d'aide ?

- 📧 **Email** : support@lebarbier.com
- 💬 **Discord** : [Rejoindre notre serveur](https://discord.gg/lebarbier)
- 🐛 **Issues** : [GitHub Issues](https://github.com/Nehemie-Jacques/LEBARBIER/issues)
- 📖 **Documentation** : [docs.lebarbier.com](https://docs.lebarbier.com)

### Pour les entreprises

Intéressé par une version personnalisée pour votre salon ?
Contactez-nous : business@lebarbier.com

---

## 📄 License

Ce projet est sous licence **MIT**.

```
MIT License

Copyright (c) 2025 Sighe Nehemie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👨‍💻 Auteur

**Sighe Nehemie**
- GitHub: [@Nehemie-Jacques](https://github.com/Nehemie-Jacques)
- LinkedIn: [Sighe Nehemie](https://linkedin.com/in/sighe-nehemie)
- Portfolio: [nehemie.dev](https://nehemie.dev)

---

## ⭐ Remerciements spéciaux

Si ce projet vous a aidé, n'hésitez pas à lui donner une ⭐ sur GitHub !

---

<div align="center">

**Fait avec ❤️ pour révolutionner l'expérience des salons de coiffure**

[⬆ Retour en haut](#-le-barbier---lart-de-la-beauté-redéfini)

</div>
