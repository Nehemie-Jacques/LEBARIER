# 🔐 Intégration Backend - Login & Logout

## Vue d'ensemble

**Oui, le login est identique pour tous les types d'utilisateurs !**
- ✅ Même endpoint : `/api/auth/callback/credentials`
- ✅ Même processus de validation
- ✅ Différenciation automatique par le rôle stocké en base

## 📊 Schéma de connexion

```
┌─────────────┐
│   CLIENT    │──┐
│   EMPLOYEE  │──┼──→ POST /api/auth/callback/credentials
│   ADMIN     │──┘        │
└─────────────┘           │
                          ▼
                    Vérification email/password
                          │
                          ▼
                    Récupération du rôle depuis la DB
                          │
                          ▼
                    Création session JWT avec le rôle
                          │
              ┌───────────┼───────────┐
              │           │           │
              ▼           ▼           ▼
         /profile    /employee    /admin
```

---

## 🚀 1. Exemples d'intégration Backend

### A. Dans un Server Component (RSC)

```typescript
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  // Récupérer la session
  const session = await auth();

  // Vérifier si l'utilisateur est connecté
  if (!session) {
    redirect('/login');
  }

  // Accéder aux infos utilisateur
  const user = session.user as any;
  
  return (
    <div>
      <h1>Bienvenue {user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      <p>Rôle: {user.role}</p>
      <p>Téléphone: {user.phone}</p>
    </div>
  );
}
```

### B. Dans une API Route

```typescript
// src/app/api/user/profile/route.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }

  const user = session.user as any;

  return NextResponse.json({
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
  });
}
```

### C. Protection par rôle dans une API Route

```typescript
// src/app/api/admin/users/route.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  // Vérifier l'authentification
  if (!session) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }

  const user = session.user as any;

  // Vérifier le rôle ADMIN
  if (user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Accès refusé - Administrateur requis' },
      { status: 403 }
    );
  }

  // L'utilisateur est admin, on peut continuer
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  return NextResponse.json(users);
}
```

### D. Protection EMPLOYEE ou ADMIN

```typescript
// src/app/api/employee/appointments/route.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }

  const user = session.user as any;

  // Vérifier le rôle EMPLOYEE ou ADMIN
  if (user.role !== 'EMPLOYEE' && user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Accès refusé - Employé ou Administrateur requis' },
      { status: 403 }
    );
  }

  // Récupérer les rendez-vous de l'employé
  const appointments = await prisma.appointment.findMany({
    where: {
      employeeId: user.id,
    },
    include: {
      customer: {
        select: {
          firstName: true,
          lastName: true,
          phone: true,
        },
      },
      service: true,
    },
    orderBy: {
      startTime: 'asc',
    },
  });

  return NextResponse.json(appointments);
}
```

---

## 🔐 2. Helper pour vérifier les rôles

Créons un helper réutilisable :

```typescript
// src/lib/auth-helpers.ts
import { auth } from '@/lib/auth';

export type UserRole = 'CLIENT' | 'EMPLOYEE' | 'ADMIN';

/**
 * Récupère la session et vérifie l'authentification
 */
export async function getAuthenticatedUser() {
  const session = await auth();
  
  if (!session) {
    return { user: null, error: 'Non authentifié', status: 401 };
  }

  const user = session.user as any;
  
  return { user, error: null, status: 200 };
}

/**
 * Vérifie si l'utilisateur a le rôle requis
 */
export async function requireRole(allowedRoles: UserRole[]) {
  const { user, error, status } = await getAuthenticatedUser();

  if (error) {
    return { user: null, error, status };
  }

  if (!allowedRoles.includes(user.role)) {
    return {
      user: null,
      error: `Accès refusé - Rôle requis: ${allowedRoles.join(' ou ')}`,
      status: 403,
    };
  }

  return { user, error: null, status: 200 };
}

/**
 * Vérifie si l'utilisateur est un admin
 */
export async function requireAdmin() {
  return requireRole(['ADMIN']);
}

/**
 * Vérifie si l'utilisateur est un employé ou admin
 */
export async function requireEmployee() {
  return requireRole(['EMPLOYEE', 'ADMIN']);
}

/**
 * Vérifie si l'utilisateur est authentifié (tous rôles)
 */
export async function requireAuth() {
  return requireRole(['CLIENT', 'EMPLOYEE', 'ADMIN']);
}
```

### Utilisation des helpers

```typescript
// src/app/api/admin/settings/route.ts
import { requireAdmin } from '@/lib/auth-helpers';
import { NextResponse } from 'next/server';

export async function GET() {
  const { user, error, status } = await requireAdmin();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  // L'utilisateur est admin, on peut continuer
  return NextResponse.json({
    message: 'Paramètres admin',
    adminUser: user.email,
  });
}
```

```typescript
// src/app/api/employee/schedule/route.ts
import { requireEmployee } from '@/lib/auth-helpers';
import { NextResponse } from 'next/server';

export async function GET() {
  const { user, error, status } = await requireEmployee();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  // L'utilisateur est employé ou admin
  return NextResponse.json({
    message: 'Planning de l\'employé',
    employee: user.email,
  });
}
```

---

## 🚪 3. Logout côté Backend

### A. API Route pour le logout

```typescript
// src/app/api/auth/logout/route.ts
import { signOut } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await signOut({ redirect: false });
    
    return NextResponse.json({
      success: true,
      message: 'Déconnexion réussie',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la déconnexion' },
      { status: 500 }
    );
  }
}
```

### B. Dans un Server Action

```typescript
// src/app/actions/auth.ts
'use server';

import { signOut } from '@/lib/auth';

export async function logoutAction() {
  try {
    await signOut({ redirectTo: '/login' });
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erreur lors de la déconnexion' };
  }
}
```

---

## 📝 4. Exemple complet : Tableau de bord selon le rôle

```typescript
// src/app/dashboard/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const user = session.user as any;

  // Rediriger selon le rôle
  switch (user.role) {
    case 'ADMIN':
      redirect('/admin');
    case 'EMPLOYEE':
      redirect('/employee');
    case 'CLIENT':
      redirect('/profile');
    default:
      redirect('/login');
  }
}
```

---

## 🔒 5. Middleware - Protection automatique

Le middleware protège automatiquement les routes selon le rôle :

```typescript
// src/middleware.ts (déjà configuré)

// ✅ Routes publiques : tout le monde peut accéder
// /
// /about
// /services
// /contact

// 🔐 Routes protégées : nécessite connexion (tous rôles)
// /profile
// /booking
// /orders
// /favorites

// 👔 Routes employés : nécessite rôle EMPLOYEE ou ADMIN
// /employee/*

// 👑 Routes admin : nécessite rôle ADMIN
// /admin/*
```

---

## 📊 6. Résumé des différences

| Aspect | CLIENT | EMPLOYEE | ADMIN |
|--------|--------|----------|-------|
| **Login** | ✅ Même endpoint | ✅ Même endpoint | ✅ Même endpoint |
| **Processus** | Identique | Identique | Identique |
| **Rôle en session** | `role: 'CLIENT'` | `role: 'EMPLOYEE'` | `role: 'ADMIN'` |
| **Accès `/profile`** | ✅ Oui | ✅ Oui | ✅ Oui |
| **Accès `/employee`** | ❌ Non | ✅ Oui | ✅ Oui |
| **Accès `/admin`** | ❌ Non | ❌ Non | ✅ Oui |
| **Logout** | ✅ Même process | ✅ Même process | ✅ Même process |

---

## 🎯 7. Cas d'usage pratiques

### Scénario 1 : Client qui réserve un rendez-vous
```typescript
// src/app/api/booking/create/route.ts
import { requireAuth } from '@/lib/auth-helpers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { user, error, status } = await requireAuth();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const body = await req.json();

  const appointment = await prisma.appointment.create({
    data: {
      customerId: user.id, // ID du client connecté
      employeeId: body.employeeId,
      serviceId: body.serviceId,
      startTime: new Date(body.startTime),
      // ...
    },
  });

  return NextResponse.json(appointment);
}
```

### Scénario 2 : Employé qui consulte ses rendez-vous
```typescript
// src/app/api/employee/my-appointments/route.ts
import { requireEmployee } from '@/lib/auth-helpers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const { user, error, status } = await requireEmployee();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  // L'employé ne voit que ses propres rendez-vous
  const appointments = await prisma.appointment.findMany({
    where: {
      employeeId: user.id,
    },
  });

  return NextResponse.json(appointments);
}
```

### Scénario 3 : Admin qui gère tous les utilisateurs
```typescript
// src/app/api/admin/users/route.ts
import { requireAdmin } from '@/lib/auth-helpers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const { user, error, status } = await requireAdmin();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  // L'admin voit tous les utilisateurs
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}
```

---

## ✅ Points clés à retenir

1. **Un seul login** : Tous les utilisateurs utilisent le même endpoint
2. **Différenciation par rôle** : Le rôle est stocké dans la session JWT
3. **Protection middleware** : Les routes sont protégées automatiquement
4. **Vérification backend** : Toujours vérifier le rôle dans les API routes
5. **Helpers réutilisables** : Utiliser `requireRole()`, `requireAdmin()`, etc.
6. **Logout universel** : Le même processus pour tous les rôles

---

## 🚀 Prochaines étapes

1. ✅ Tester le login avec Postman
2. ✅ Créer les helpers `auth-helpers.ts`
3. ✅ Protéger les API routes existantes
4. ✅ Tester les accès selon les rôles
5. ✅ Intégrer le logout
