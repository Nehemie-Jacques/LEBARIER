# 🧪 Guide de Tests Backend - LE BARBIER

## 📋 Vue d'ensemble

Ce guide explique comment tester tous les endpoints backend de l'application LE BARBIER avec Postman.

---

## 🚀 Installation de la collection Postman

### Méthode 1 : Import du fichier
1. Ouvrir Postman
2. Cliquer sur **Import**
3. Sélectionner le fichier `LEBARBIER_Backend_Tests.postman_collection.json`
4. La collection apparaît dans votre sidebar

### Méthode 2 : Glisser-déposer
Glisser le fichier JSON directement dans Postman

---

## ⚙️ Configuration

### Variable d'environnement
La collection utilise la variable `{{baseUrl}}` définie à `http://localhost:3001`

Pour modifier :
1. Cliquer sur la collection
2. Onglet **Variables**
3. Modifier `baseUrl` si votre serveur tourne sur un autre port

---

## 📂 Structure de la collection

La collection contient **7 dossiers** avec **30+ requêtes** :

### 1. 🔐 Authentification (6 requêtes)
Tests du système d'authentification identique pour tous les rôles

### 2. 👤 Profil Utilisateur (2 requêtes)
Gestion du profil - Accessible à tous

### 3. 👔 Employé (4 requêtes)
Endpoints pour EMPLOYEE et ADMIN

### 4. 👑 Admin (5 requêtes)
Endpoints pour ADMIN uniquement

### 5. 📋 Rendez-vous (2 requêtes)
Gestion des rendez-vous clients

### 6. 💇 Services (2 requêtes)
Consultation des services (public)

### 7. 👥 Employés (2 requêtes)
Informations sur les employés (public)

### 8. 🧪 Tests de Protection (4 requêtes)
Vérifier que les protections fonctionnent

---

## 🎯 Scénarios de test

### Scénario 1 : Test complet CLIENT

1. **Register** → Créer un compte
   ```
   POST /api/auth/register
   ```

2. **Login Client** → Se connecter
   ```
   POST /api/auth/callback/credentials
   ```
   ⚠️ **Important** : Les cookies de session sont automatiquement sauvegardés

3. **Get Session** → Vérifier la session
   ```
   GET /api/auth/session
   ```

4. **Get My Profile** → Voir son profil
   ```
   GET /api/user/profile
   ```

5. **Update My Profile** → Modifier son profil
   ```
   PUT /api/user/profile
   ```

6. **Logout** → Se déconnecter
   ```
   POST /api/auth/logout
   ```

**Résultats attendus :**
- ✅ Register : 201 Created
- ✅ Login : 200 OK + Cookie de session
- ✅ Session : 200 OK + Données utilisateur
- ✅ Profile : 200 OK + Détails complets
- ✅ Update : 200 OK + Profil mis à jour
- ✅ Logout : 200 OK

---

### Scénario 2 : Test EMPLOYEE

1. **Login Employee**
   ```json
   {
     "email": "employee@lebarbier.com",
     "password": "Employee123!"
   }
   ```

2. **Get My Appointments**
   ```
   GET /api/employee/appointments
   ```

3. **Filter by Status**
   ```
   GET /api/employee/appointments?status=PENDING
   ```

4. **Update Appointment**
   ```
   PATCH /api/employee/appointments
   Body: { "appointmentId": "...", "status": "CONFIRMED" }
   ```

**Résultats attendus :**
- ✅ Login : 200 OK + role: "EMPLOYEE"
- ✅ Appointments : 200 OK + Liste de rendez-vous
- ✅ Filter : 200 OK + Rendez-vous filtrés
- ✅ Update : 200 OK + Rendez-vous modifié

---

### Scénario 3 : Test ADMIN

1. **Login Admin**
   ```json
   {
     "email": "admin@lebarbier.com",
     "password": "Admin123!"
   }
   ```

2. **Get All Users**
   ```
   GET /api/admin/users
   ```

3. **Filter by Role**
   ```
   GET /api/admin/users?role=CLIENT
   ```

4. **Search Users**
   ```
   GET /api/admin/users?search=john
   ```

5. **Create User**
   ```
   POST /api/admin/users
   Body: { email, password, firstName, lastName, phone, role }
   ```

**Résultats attendus :**
- ✅ Login : 200 OK + role: "ADMIN"
- ✅ Get Users : 200 OK + Liste complète + Statistiques
- ✅ Filter : 200 OK + Utilisateurs filtrés
- ✅ Search : 200 OK + Résultats de recherche
- ✅ Create : 201 Created + Nouvel utilisateur

---

### Scénario 4 : Tests de sécurité 🔒

#### Test 1 : CLIENT essaie d'accéder aux routes EMPLOYEE
```
1. Se connecter en tant que CLIENT
2. Essayer: GET /api/employee/appointments
```
**Attendu :** ❌ 403 Forbidden - "Accès refusé - Rôle requis: EMPLOYEE ou ADMIN"

#### Test 2 : CLIENT essaie d'accéder aux routes ADMIN
```
1. Se connecter en tant que CLIENT
2. Essayer: GET /api/admin/users
```
**Attendu :** ❌ 403 Forbidden - "Accès refusé - Rôle requis: ADMIN"

#### Test 3 : EMPLOYEE essaie d'accéder aux routes ADMIN
```
1. Se connecter en tant que EMPLOYEE
2. Essayer: GET /api/admin/users
```
**Attendu :** ❌ 403 Forbidden - "Accès refusé - Rôle requis: ADMIN"

#### Test 4 : Sans connexion
```
Sans se connecter, essayer: GET /api/user/profile
```
**Attendu :** ❌ 401 Unauthorized - "Non authentifié"

---

## 📊 Tableau récapitulatif des endpoints

| Endpoint | Méthode | Rôles autorisés | Description |
|----------|---------|-----------------|-------------|
| `/api/auth/register` | POST | Public | Créer un compte |
| `/api/auth/callback/credentials` | POST | Public | Se connecter (tous rôles) |
| `/api/auth/session` | GET | Connecté | Voir la session |
| `/api/auth/logout` | POST | Connecté | Se déconnecter |
| `/api/user/profile` | GET | Tous | Voir son profil |
| `/api/user/profile` | PUT | Tous | Modifier son profil |
| `/api/employee/appointments` | GET | EMPLOYEE, ADMIN | Voir ses rendez-vous |
| `/api/employee/appointments` | PATCH | EMPLOYEE, ADMIN | Modifier un rendez-vous |
| `/api/admin/users` | GET | ADMIN | Lister les utilisateurs |
| `/api/admin/users` | POST | ADMIN | Créer un utilisateur |
| `/api/appointments` | POST | CLIENT | Créer un rendez-vous |
| `/api/appointments` | GET | CLIENT | Voir ses rendez-vous |
| `/api/services` | GET | Public | Liste des services |
| `/api/employees` | GET | Public | Liste des employés |

---

## 🔧 Création des utilisateurs de test

Pour tester complètement, créez ces utilisateurs :

### 1. CLIENT (via Register ou script)
```bash
npm run test:create-client
```
Ou utilisez l'endpoint Register dans Postman

### 2. EMPLOYEE (via Admin ou base de données)
```sql
-- Dans la base de données
UPDATE users SET role = 'EMPLOYEE' WHERE email = 'employee@lebarbier.com';
```

### 3. ADMIN (via base de données)
```sql
-- Dans la base de données
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@lebarbier.com';
```

Ou créez-les via le script :
```bash
npx tsx scripts/create-test-user.js
```

---

## ✅ Checklist de tests

### Tests d'authentification
- [ ] Inscription d'un nouveau client
- [ ] Connexion CLIENT
- [ ] Connexion EMPLOYEE
- [ ] Connexion ADMIN
- [ ] Récupération de session
- [ ] Déconnexion

### Tests de profil
- [ ] Voir son profil
- [ ] Modifier son profil

### Tests EMPLOYEE
- [ ] Voir ses rendez-vous
- [ ] Filtrer par statut
- [ ] Filtrer par date
- [ ] Modifier un rendez-vous

### Tests ADMIN
- [ ] Lister tous les utilisateurs
- [ ] Filtrer par rôle
- [ ] Rechercher un utilisateur
- [ ] Filtrer par statut actif
- [ ] Créer un utilisateur

### Tests de sécurité
- [ ] CLIENT bloqué sur routes EMPLOYEE
- [ ] CLIENT bloqué sur routes ADMIN
- [ ] EMPLOYEE bloqué sur routes ADMIN
- [ ] Utilisateur non connecté bloqué

---

## 🐛 Dépannage

### Problème : "Non authentifié"
**Solution :** Assurez-vous d'avoir fait le login avant. Postman gère automatiquement les cookies.

### Problème : "Accès refusé"
**Solution :** Vérifiez que vous êtes connecté avec le bon rôle pour cet endpoint.

### Problème : "Port 3001 non accessible"
**Solution :** 
```bash
cd /home/nehemie/Mes_projets/LEBARBIER
npm run dev
```

### Problème : Utilisateur n'existe pas
**Solution :** Créez-le via Register ou le script :
```bash
npx tsx scripts/create-test-user.js
```

---

## 📈 Tests automatiques

La collection inclut des tests automatiques qui vérifient :
- ✅ Temps de réponse < 5000ms
- ✅ Réponse au format JSON
- ✅ Codes de statut HTTP corrects

Pour voir les résultats :
1. Exécutez une requête
2. Onglet **Test Results** en bas

---

## 🚀 Runner (Tests en masse)

Pour exécuter toute la collection :

1. Cliquer sur la collection
2. **Run**
3. Sélectionner les dossiers à tester
4. **Run LE BARBIER Backend Tests**

Vous verrez un rapport complet avec :
- ✅ Tests réussis (vert)
- ❌ Tests échoués (rouge)
- ⏱️ Temps d'exécution

---

## 📝 Notes importantes

1. **Cookies automatiques** : Postman gère les cookies de session automatiquement après le login

2. **Ordre des requêtes** : Toujours faire le login AVANT les requêtes protégées

3. **IDs dynamiques** : Remplacez `[id]` par un vrai ID de votre base de données

4. **Dates** : Utilisez le format ISO 8601 : `2024-12-20T10:00:00Z`

5. **Rôles** : 
   - `CLIENT` : Utilisateur normal
   - `EMPLOYEE` : Barbier/Employé
   - `ADMIN` : Administrateur

---

## 🎓 Pour aller plus loin

- Documentation complète : `/docs/BACKEND_AUTH_INTEGRATION.md`
- Helpers auth : `/src/lib/auth-helpers.ts`
- Middleware : `/src/middleware.ts`
- Schéma Prisma : `/prisma/schema.prisma`

---

## 📞 Support

En cas de problème :
1. Vérifier que le serveur tourne : `npm run dev`
2. Vérifier les logs du serveur dans le terminal
3. Consulter `/docs/TROUBLESHOOTING_AUTH.md`

Bon test ! 🚀
