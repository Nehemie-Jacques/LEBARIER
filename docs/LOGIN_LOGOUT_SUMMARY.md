# 🎯 Résumé : Login/Logout Backend - LE BARBIER

## ✅ Réponse à votre question

**OUI, le login est identique pour tous les types d'utilisateurs !**

```
CLIENT ──┐
EMPLOYEE ├──→ Même endpoint : POST /api/auth/callback/credentials
ADMIN ───┘    Même processus de validation
```

La différenciation se fait **automatiquement** via le rôle stocké dans la base de données.

---

## 📋 Ce qui a été créé

### 1. Helpers d'authentification (`/src/lib/auth-helpers.ts`)

```typescript
import { requireAdmin, requireEmployee, requireAuth } from '@/lib/auth-helpers';

// Pour tous les utilisateurs connectés
const { user, error, status } = await requireAuth();

// Pour les employés et admins
const { user, error, status } = await requireEmployee();

// Pour les admins uniquement
const { user, error, status } = await requireAdmin();
```

### 2. Middleware mis à jour (`/src/middleware.ts`)

Protection automatique des routes selon le rôle :
- `/profile`, `/booking` → Utilisateurs connectés (tous rôles)
- `/employee/*` → EMPLOYEE ou ADMIN
- `/admin/*` → ADMIN uniquement

### 3. API Routes créées

#### A. Profile (tous utilisateurs)
- `GET /api/user/profile` → Récupérer son profil
- `PUT /api/user/profile` → Mettre à jour son profil

#### B. Employés
- `GET /api/employee/appointments` → Voir ses rendez-vous
- `PATCH /api/employee/appointments` → Modifier un rendez-vous

#### C. Admin
- `GET /api/admin/users` → Lister tous les utilisateurs
- `POST /api/admin/users` → Créer un utilisateur

#### D. Logout
- `POST /api/auth/logout` → Déconnexion (tous rôles)

---

## 🚀 Comment utiliser

### Exemple 1 : API Route pour tous
```typescript
// src/app/api/booking/route.ts
import { requireAuth } from '@/lib/auth-helpers';

export async function POST(req: Request) {
  const { user, error, status } = await requireAuth();
  
  if (error) {
    return NextResponse.json({ error }, { status });
  }
  
  // user.id, user.role, user.email disponibles
  const booking = await prisma.appointment.create({
    data: { userId: user.id, ... }
  });
}
```

### Exemple 2 : API Route pour employés
```typescript
// src/app/api/employee/schedule/route.ts
import { requireEmployee } from '@/lib/auth-helpers';

export async function GET() {
  const { user, error, status } = await requireEmployee();
  
  if (error) {
    return NextResponse.json({ error }, { status });
  }
  
  // Seuls EMPLOYEE et ADMIN arrivent ici
  const schedule = await getSchedule(user.id);
}
```

### Exemple 3 : API Route pour admins
```typescript
// src/app/api/admin/settings/route.ts
import { requireAdmin } from '@/lib/auth-helpers';

export async function PUT(req: Request) {
  const { user, error, status } = await requireAdmin();
  
  if (error) {
    return NextResponse.json({ error }, { status });
  }
  
  // Seuls les ADMIN arrivent ici
  await updateSettings(body);
}
```

---

## 🧪 Tester avec Postman

### 1. Se connecter (tous types d'utilisateurs)
```
POST http://localhost:3001/api/auth/callback/credentials
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Password123!"
}
```

### 2. Récupérer son profil
```
GET http://localhost:3001/api/user/profile
Cookie: (automatique si vous avez le cookie de session)
```

### 3. Se déconnecter
```
POST http://localhost:3001/api/auth/logout
Cookie: (le cookie de session)
```

---

## 📊 Tableau récapitulatif

| Endpoint | CLIENT | EMPLOYEE | ADMIN | Helper à utiliser |
|----------|--------|----------|-------|-------------------|
| `POST /api/auth/callback/credentials` | ✅ | ✅ | ✅ | Aucun (public) |
| `GET /api/user/profile` | ✅ | ✅ | ✅ | `requireAuth()` |
| `GET /api/employee/appointments` | ❌ | ✅ | ✅ | `requireEmployee()` |
| `GET /api/admin/users` | ❌ | ❌ | ✅ | `requireAdmin()` |
| `POST /api/auth/logout` | ✅ | ✅ | ✅ | Aucun |

---

## 🎯 Points clés

1. **Un seul endpoint de login** pour tous
2. **Le rôle est automatiquement ajouté** à la session JWT
3. **Protection via helpers** dans les API routes
4. **Protection automatique** des routes via middleware
5. **Logout universel** pour tous les rôles

---

## 📖 Documentation complète

- `/docs/BACKEND_AUTH_INTEGRATION.md` → Guide complet avec exemples
- `/src/lib/auth-helpers.ts` → Code source des helpers
- `/src/middleware.ts` → Protection des routes

---

## ✅ Prochaines étapes recommandées

1. Testez le login avec Postman (credentials déjà créés)
2. Testez `GET /api/user/profile` après connexion
3. Testez le logout
4. Créez d'autres API routes selon vos besoins en utilisant les helpers
5. Intégrez le login/logout dans le frontend

Voulez-vous que je vous aide à tester l'un de ces endpoints ? 🚀
