# 📝 Changelog - LE BARBIER

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [3.0.0] - 2025-12-19

### ✅ Ajouté

#### API Appointments (CRUD Complet)
- **GET `/api/appointments`** - Liste des rendez-vous avec filtres
  - Filtre par statut : `?status=PENDING|CONFIRMED|IN_PROGRESS|COMPLETED|CANCELLED`
  - Filtre par dates : `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
  - Statistiques incluses (total + byStatus)
  - Relations : employee.user, service, address, payment, review

- **POST `/api/appointments`** - Créer un rendez-vous
  - Validation Zod complète
  - Calcul prix automatique : servicePrice + travelFee (5000 FCFA si HOME)
  - Vérification employé et service existants

- **GET `/api/appointments/[id]`** - Détails d'un rendez-vous
  - Contrôle d'accès : propriétaire ou admin
  - Relations complètes

- **PUT `/api/appointments/[id]`** - Modifier un rendez-vous
  - Champs modifiables : status, notes, cancellationReason
  - Mise à jour automatique de cancelledAt si CANCELLED
  - Accès : propriétaire ou admin

- **DELETE `/api/appointments/[id]`** - Supprimer un rendez-vous
  - Suppression définitive
  - Accès : propriétaire ou admin

- **GET `/api/appointments/availability`** - Vérifier disponibilités
  - Query params : `employeeId` (requis), `date` (requis)
  - Génération créneaux horaires 8h-18h
  - Détection conflits avec rendez-vous CONFIRMED/IN_PROGRESS

#### API Services (CRUD Complet)
- **GET `/api/services`** - Liste des services (PUBLIC)
  - Retourne services actifs uniquement
  - Statistiques par catégorie (COUPE, BARBE, COLORATION, SOIN, COMBO)

- **POST `/api/services`** - Créer un service (ADMIN uniquement)
  - Validation Zod : name, description, price, duration, category, imageUrl, isActive
  - Authentification admin requise

- **GET `/api/services/[id]`** - Détails d'un service (PUBLIC)
  - Accessible sans authentification

- **PUT `/api/services/[id]`** - Modifier un service (ADMIN uniquement)
  - Modification partielle supportée
  - Validation Zod

- **DELETE `/api/services/[id]`** - Supprimer un service (ADMIN uniquement)
  - Suppression définitive (hard delete)

#### Documentation & Tests
- **Collection Postman v3.0.0**
  - Nouvelle section "📅 Rendez-vous - CRUD Complet" (9 requêtes)
  - Nouvelle section "💈 Services - CRUD Complet" (6 requêtes)
  - Exemples de requêtes complets avec body JSON
  - Variables d'environnement (baseUrl)

- **Fichier backup créé** : `LEBARBIER_Backend_Tests.postman_collection.json.backup`

### 🔧 Modifié

#### Authentication
- **Register endpoint** - Ajout champ `acceptTerms` obligatoire
  - Validation : doit être `true`
  - Mise à jour collection Postman avec exemple correct

#### Documentation
- **STRUCTURE.md** - Mise à jour arborescence complète
  - Structure `/src` détaillée
  - Points clés des nouvelles APIs
  - Statistiques du projet

- **docs/API.md** - Documentation API complète
  - Version 3.0.0
  - Exemples de requêtes/réponses
  - Codes de statut HTTP
  - Niveaux d'authentification

- **README.md** - Mise à jour page d'accueil
  - Badge API v3.0.0
  - Fonctionnalités backend complètes
  - Statut du projet actualisé

### 🛡️ Sécurité

- **Contrôles d'accès renforcés**
  - Appointments : propriétaire ou admin uniquement
  - Services : création/modification/suppression = admin uniquement
  - Validation Zod sur tous les endpoints

- **Auth helpers utilisés**
  - `requireAuth()` pour authentification basique
  - `requireAdmin()` pour endpoints admin

### 📊 Statistiques

#### Endpoints API
- **Total** : 40+ endpoints
- **CRUD complet** : Appointments (5 endpoints), Services (5 endpoints)
- **Availability** : 1 endpoint dédié

#### Fichiers créés/modifiés
- Créés : 5 fichiers de routes API
- Modifiés : 5 fichiers de documentation
- Backup : 1 fichier Postman

---

## [2.0.0] - 2025-12-18

### ✅ Ajouté

#### Authentication complète
- NextAuth v5 configuration
- Routes auth : `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`
- Auth helpers : `requireAuth()`, `requireAdmin()`, `requireEmployeeOrAdmin()`
- Middleware protection des routes

#### Admin Management
- **GET `/api/admin/users`** - Liste utilisateurs avec filtres
  - Filtre par rôle : `?role=CLIENT|EMPLOYEE|ADMIN`
  - Recherche : `?search=john`
  - Statut actif : `?isActive=true`

- **POST `/api/admin/users`** - Créer utilisateur avec n'importe quel rôle

#### Employee Management
- **GET `/api/employee/appointments`** - Rendez-vous de l'employé
  - Filtres : status, date
  - Statistiques incluses

- **PATCH `/api/employee/appointments`** - Modifier statut rendez-vous

#### Profile Management
- **GET `/api/user/profile`** - Récupérer profil
- **PUT `/api/user/profile`** - Modifier profil

#### Collection Postman v2.0.0
- 8 dossiers de tests
- 30+ requêtes
- Tests de protection des routes
- Variables d'environnement

---

## [1.0.0] - 2025-12-15

### ✅ Ajouté

#### Structure Initiale
- Configuration Next.js 14 avec App Router
- Prisma avec 12 modèles (User, Employee, Service, Appointment, etc.)
- Tailwind CSS + shadcn/ui
- TypeScript strict mode

#### Pages Publiques
- Page d'accueil
- Services
- Équipe
- Galerie
- À propos
- Contact
- Blog

#### Composants
- Layout (Header, Footer, Sidebar)
- UI components (shadcn/ui)
- Components métier (ServiceCard, EmployeeCard, etc.)

#### Configuration
- ESLint + Prettier
- Git hooks (Husky)
- Environment variables template
- README complet

---

## Types de changements

- **✅ Ajouté** : nouvelles fonctionnalités
- **🔧 Modifié** : changements dans fonctionnalités existantes
- **🗑️ Supprimé** : fonctionnalités retirées
- **🐛 Corrigé** : corrections de bugs
- **🛡️ Sécurité** : corrections de vulnérabilités
- **📚 Documentation** : modifications de documentation uniquement
- **⚡ Performance** : améliorations de performance

---

**Mainteneur** : Nehemie Jacques  
**Contact** : nehemie.jacques@lebarbier.com
