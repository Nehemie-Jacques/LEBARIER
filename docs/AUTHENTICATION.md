# 🔐 Guide d'Authentification - LE BARBIER

> Documentation complète du système d'authentification avec NextAuth.js v5

---

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Configuration](#configuration)
4. [Utilisation](#utilisation)
5. [Sécurité](#sécurité)
6. [Dépannage](#dépannage)

---

## 🎯 Vue d'ensemble

Le système d'authentification de LE BARBIER utilise **NextAuth.js v5** avec Next.js App Router et offre :

### Fonctionnalités

- ✅ **Authentification par email/mot de passe** (Credentials)
- ✅ **OAuth Google** (extensible à Facebook, GitHub, etc.)
- ✅ **Gestion des sessions JWT** (30 jours)
- ✅ **Rôles utilisateur** (CLIENT, EMPLOYEE, ADMIN)
- ✅ **Vérification d'email** (à implémenter)
- ✅ **Programme de fidélité** intégré
- ✅ **Protection des routes** (middleware)
- ✅ **Logs d'activité** (connexion, déconnexion, etc.)

---

## 🏗️ Architecture

### Structure des fichiers

```
src/
├── app/
│   └── api/
│       └── auth/
│           ├── [...nextauth]/
│           │   └── route.ts          ← Handler NextAuth principal
│           └── register/
│               └── route.ts          ← Endpoint d'inscription
│
├── lib/
│   └── auth.ts                       ← Configuration NextAuth
│
└── middleware.ts                     ← Protection des routes (à créer)
```

### Flux d'authentification

```
┌─────────────────────────────────────────────────────────┐
│                    INSCRIPTION                          │
└─────────────────────────────────────────────────────────┘
User → POST /api/auth/register → Validation → Hash password 
→ Create User → Send email → Success

┌─────────────────────────────────────────────────────────┐
│                CONNEXION (Credentials)                  │
└─────────────────────────────────────────────────────────┘
User → POST /api/auth/signin/credentials → Verify password
→ Create JWT → Create session → Redirect

┌─────────────────────────────────────────────────────────┐
│                 CONNEXION (OAuth Google)                │
└─────────────────────────────────────────────────────────┘
User → GET /api/auth/signin/google → Redirect Google
→ Callback → Create/Update User → Create session → Redirect

┌─────────────────────────────────────────────────────────┐
│                    VÉRIFICATION                         │
└─────────────────────────────────────────────────────────┘
Request → Middleware → Verify JWT → Attach user → Continue

┌─────────────────────────────────────────────────────────┐
│                    DÉCONNEXION                          │
└─────────────────────────────────────────────────────────┘
User → POST /api/auth/signout → Delete session → Redirect
```

---

## ⚙️ Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` :

```env
# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-ici"  # openssl rand -base64 32

# Google OAuth (optionnel)
GOOGLE_CLIENT_ID="votre-google-client-id"
GOOGLE_CLIENT_SECRET="votre-google-client-secret"

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lebarbier"
```

### 2. Configuration Google OAuth

1. **Console Google Cloud** : https://console.cloud.google.com
2. **Créer un projet** ou sélectionner un existant
3. **Activer Google+ API**
4. **Créer des identifiants OAuth 2.0**
5. **Ajouter les URI de redirection** :
   - Développement : `http://localhost:3000/api/auth/callback/google`
   - Production : `https://votredomaine.com/api/auth/callback/google`
6. **Copier** Client ID et Client Secret dans `.env.local`

### 3. Générer le secret NextAuth

```bash
openssl rand -base64 32
```

Copiez le résultat dans `NEXTAUTH_SECRET` de votre `.env.local`.

---

## 📘 Utilisation

### 🎨 Frontend

#### 1. Inscription

```typescript
// app/(auth)/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    acceptTerms: false,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Succès - rediriger vers login
      router.push('/login?registered=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inscription');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Vos champs de formulaire */}
      {error && <div className="error">{error}</div>}
      <button type="submit">S'inscrire</button>
    </form>
  );
}
```

#### 2. Connexion (Credentials)

```typescript
// app/(auth)/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      // Succès - rediriger selon le rôle
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Mot de passe"
        required
      />
      {error && <div className="error">{error}</div>}
      <button type="submit">Se connecter</button>
    </form>
  );
}
```

#### 3. Connexion OAuth (Google)

```typescript
'use client';

import { signIn } from 'next-auth/react';

export function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      className="btn-google"
    >
      <svg>...</svg> {/* Icône Google */}
      Continuer avec Google
    </button>
  );
}
```

#### 4. Déconnexion

```typescript
'use client';

import { signOut } from 'next-auth/react';

export function LogoutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })}>
      Déconnexion
    </button>
  );
}
```

#### 5. Récupérer la session (Client Component)

```typescript
'use client';

import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Non connecté</div>;
  }

  return (
    <div>
      <h1>Bienvenue {session.user.firstName}</h1>
      <p>Email: {session.user.email}</p>
      <p>Rôle: {session.user.role}</p>
      <p>Points de fidélité: {session.user.loyaltyPoints}</p>
    </div>
  );
}
```

### 🖥️ Backend

#### 1. Server Component

```typescript
// app/dashboard/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Dashboard de {session.user.firstName}</h1>
      <p>Rôle: {session.user.role}</p>
    </div>
  );
}
```

#### 2. API Route protégée

```typescript
// app/api/appointments/route.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  // Vérifier l'authentification
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }

  // Récupérer les rendez-vous de l'utilisateur
  const appointments = await prisma.appointment.findMany({
    where: { clientId: session.user.id },
  });

  return NextResponse.json({ appointments });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }

  const body = await request.json();

  // Créer un rendez-vous
  const appointment = await prisma.appointment.create({
    data: {
      ...body,
      clientId: session.user.id,
    },
  });

  return NextResponse.json({ appointment }, { status: 201 });
}
```

#### 3. Middleware - Protection des routes

```typescript
// middleware.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Routes publiques
  const publicRoutes = ['/', '/about', '/services', '/contact'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Routes d'authentification
  const authRoutes = ['/login', '/register', '/forgot-password'];
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Routes protégées
  const protectedRoutes = ['/dashboard', '/profile', '/booking'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Routes admin
  const isAdminRoute = pathname.startsWith('/admin');

  // Routes employé
  const isEmployeeRoute = pathname.startsWith('/employee');

  // Rediriger si déjà connecté et sur une route d'auth
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Rediriger si non connecté et sur une route protégée
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Vérifier le rôle pour les routes admin
  if (isAdminRoute && req.auth?.user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Vérifier le rôle pour les routes employé
  if (isEmployeeRoute && !['EMPLOYEE', 'ADMIN'].includes(req.auth?.user?.role || '')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
});

// Configuration des routes à protéger
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
```

---

## 🛡️ Sécurité

### Mesures de sécurité implémentées

- ✅ **Hachage bcrypt** (12 rounds) pour les mots de passe
- ✅ **JWT sécurisé** avec secret fort
- ✅ **HTTPOnly cookies** (protection XSS)
- ✅ **Secure cookies** en production (HTTPS)
- ✅ **CSRF protection** (intégré NextAuth)
- ✅ **Session expiry** : 30 jours
- ✅ **Email verification** (à implémenter)
- ✅ **Validation des données** (Zod)

### Bonnes pratiques

```typescript
// ✅ BON
const hashedPassword = await bcrypt.hash(password, 12);

// ❌ MAUVAIS
const hashedPassword = await bcrypt.hash(password, 1); // Trop faible

// ✅ BON
NEXTAUTH_SECRET="cW9ERjhZVm1xUGZGNzBxSE..." // 32+ caractères

// ❌ MAUVAIS
NEXTAUTH_SECRET="secret123" // Trop simple
```

---

## 🐛 Dépannage

### Erreurs communes

#### 1. "Email ou mot de passe incorrect"

**Cause** : Credentials invalides ou utilisateur inexistant

**Solution** :
```typescript
// Vérifier que l'utilisateur existe dans la BDD
const user = await prisma.user.findUnique({
  where: { email: 'test@example.com' }
});
console.log(user); // null si n'existe pas
```

#### 2. "Compte désactivé"

**Cause** : `user.isActive === false`

**Solution** :
```typescript
await prisma.user.update({
  where: { email: 'user@example.com' },
  data: { isActive: true }
});
```

#### 3. Session non définie

**Cause** : Pas de `SessionProvider` dans le layout

**Solution** :
```typescript
// app/layout.tsx
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

#### 4. Redirection infinie

**Cause** : Middleware mal configuré

**Solution** :
```typescript
// Vérifier que les routes publiques ne sont pas protégées
const publicRoutes = ['/', '/login', '/register'];
if (publicRoutes.includes(pathname)) {
  return NextResponse.next();
}
```

### Logs de debugging

```typescript
// Activer les logs NextAuth
debug: process.env.NODE_ENV === 'development'

// Vérifier la session
console.log('Session:', await auth());

// Vérifier le JWT
console.log('Token:', token);
```

---

## 📊 Monitoring

### Logs d'activité

Tous les événements sont loggés dans `SystemLog` :

```sql
SELECT * FROM "SystemLog"
WHERE message LIKE '%Connexion%'
ORDER BY "createdAt" DESC
LIMIT 10;
```

### Statistiques

```typescript
// Nombre d'inscriptions aujourd'hui
const todayRegistrations = await prisma.user.count({
  where: {
    createdAt: {
      gte: new Date(new Date().setHours(0, 0, 0, 0))
    }
  }
});

// Utilisateurs actifs
const activeUsers = await prisma.user.count({
  where: { isActive: true }
});
```

---

## 📚 Ressources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [JWT.io](https://jwt.io/) - Debugger JWT

---

**Mise à jour** : 18 décembre 2025
