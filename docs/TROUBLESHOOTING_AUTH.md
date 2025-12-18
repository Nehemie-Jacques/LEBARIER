# 🔧 Guide de résolution - Erreur 500 NextAuth

## ❌ Problème rencontré
**Erreur 500 Internal Server Error** lors de la connexion via `/api/auth/callback/credentials`

## ✅ Solutions appliquées

### 1. Suppression de PrismaAdapter avec Credentials Provider

**Problème** : NextAuth v5 a une incompatibilité entre `PrismaAdapter` et `CredentialsProvider`.

**Solution** :
```typescript
// ❌ AVANT
export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as any, // Cause des erreurs

// ✅ APRÈS
export const authOptions: NextAuthConfig = {
  // Adapter désactivé pour Credentials Provider
```

### 2. Optimisation du callback JWT

**Problème** : La récupération de l'utilisateur à chaque requête causait des erreurs.

**Solution** :
```typescript
// ✅ APRÈS - Récupération uniquement lors des mises à jour explicites
if (trigger === 'update' && token.id) {
  try {
    const freshUser = await prisma.user.findUnique({...});
  } catch (error) {
    console.error('Erreur récupération utilisateur:', error);
  }
}
```

### 3. Gestion des erreurs dans les callbacks

**Solution** : Ajout de try/catch dans tous les callbacks critiques.

### 4. Création du fichier `.env.local`

**Problème** : Variables d'environnement manquantes.

**Solution** : Fichier `.env.local` créé avec :
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret"
DATABASE_URL="postgresql://..."
```

---

## 🚀 Étapes de test

### 1. Configurer `.env.local`

Ouvrez `/home/nehemie/Mes_projets/LEBARBIER/.env.local` et remplissez :

```env
# URL de votre base de données PostgreSQL
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE"

# Exemple :
DATABASE_URL="postgresql://postgres:monmotdepasse@localhost:5432/lebarbier"
```

### 2. Redémarrer le serveur

```bash
# Arrêter le serveur actuel (Ctrl+C)
# Puis redémarrer
npm run dev
```

### 3. Tester avec Postman

**Mise à jour de l'URL de base** :
- Si le serveur démarre sur port 3001 : `http://localhost:3001`
- Si port 3000 : `http://localhost:3000`

**Test 1 - Inscription** :
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Password123!",
  "firstName": "Test",
  "lastName": "User",
  "phone": "+237600000000",
  "acceptTerms": true
}
```

**Test 2 - Connexion** :
```
POST http://localhost:3000/api/auth/callback/credentials
Content-Type: application/x-www-form-urlencoded

email=test@example.com&password=Password123!
```

---

## 🐛 Si l'erreur persiste

### Vérifier les logs du serveur

1. Ouvrir un terminal
2. Lancer : `npm run dev`
3. Observer les erreurs détaillées

### Vérifier la connexion à la base de données

```bash
# Tester Prisma
npx prisma db push

# Ouvrir Prisma Studio
npx prisma studio
```

### Vérifier NextAuth

```bash
# Générer un nouveau secret
openssl rand -base64 32

# Copier le résultat dans .env.local :
NEXTAUTH_SECRET="le-nouveau-secret-généré"
```

---

## 📋 Checklist de dépannage

- [ ] Fichier `.env.local` existe
- [ ] `DATABASE_URL` est correcte
- [ ] `NEXTAUTH_URL` correspond au port du serveur
- [ ] `NEXTAUTH_SECRET` est défini
- [ ] Serveur redémarré après modifications
- [ ] Base de données accessible (`npx prisma studio`)
- [ ] Utilisateur de test créé dans la BDD
- [ ] Postman utilise la bonne URL de base

---

## 🔍 Logs à surveiller

Lors du test, surveillez la console pour :

```
✓ Compiled /api/auth/callback/credentials
✅ Connexion: test@example.com via credentials
✓ Session créée
```

Si vous voyez :
```
❌ Erreur signIn callback: ...
❌ Erreur event signIn: ...
```

C'est un problème avec Prisma ou la base de données.

---

## 💡 Astuce

Pour des tests rapides sans erreurs de logs :

```typescript
// Dans src/lib/auth.ts - Désactiver temporairement les logs
events: {
  async signIn({ user, account, isNewUser }) {
    // Commenté temporairement pour debug
    // await prisma.systemLog.create({...});
    console.log(`✅ Connexion: ${user.email}`);
  }
}
```

---

## ✅ Test final

Une fois tout configuré, cette séquence devrait fonctionner :

1. ✅ Inscription → Status 201
2. ✅ Connexion → Status 200 + Cookie
3. ✅ Session → Status 200 + User data
4. ✅ Déconnexion → Status 200

---

**Besoin d'aide ?** Consultez les logs du serveur pour l'erreur exacte !
