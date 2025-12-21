# 🚀 Guide de Démarrage Rapide - Le Barbier

## ✅ Arborescence Créée avec Succès !

**163+ fichiers créés** avec une structure complète et professionnelle.

## 📦 Installation des Dépendances

### 1. Dépendances Core
```bash
npm install next@latest react@latest react-dom@latest
npm install -D typescript @types/react @types/node @types/react-dom
```

### 2. Base de Données (Prisma)
```bash
npm install @prisma/client
npm install -D prisma tsx
```

### 3. Authentification
```bash
npm install next-auth@beta bcryptjs
npm install -D @types/bcryptjs
```

### 4. Validation & Forms
```bash
npm install zod react-hook-form @hookform/resolvers
```

### 5. State Management
```bash
npm install zustand
```

### 6. Styling
```bash
npm install tailwindcss postcss autoprefixer
npm install clsx tailwind-merge
npm install class-variance-authority
npm install lucide-react
```

### 7. UI Components (Shadcn/ui)
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input card dialog dropdown-menu select toast badge avatar tabs calendar
```

### 8. Paiements
```bash
npm install stripe
npm install @stripe/stripe-js
# Pour Orange Money et Mobile Money, utiliser leurs SDK respectifs
```

### 9. Email & SMS
```bash
npm install @sendgrid/mail
npm install twilio
```

### 10. Storage
```bash
npm install @aws-sdk/client-s3
npm install @aws-sdk/s3-request-presigner
```

### 11. AI Chatbot
```bash
npm install openai
```

### 12. Analytics
```bash
npm install @vercel/analytics
```

### 13. Utilities
```bash
npm install date-fns
npm install sharp
```

### Installation Rapide (Tout en Une)
```bash
npm install next react react-dom @prisma/client next-auth bcryptjs zod react-hook-form @hookform/resolvers zustand tailwindcss postcss autoprefixer clsx tailwind-merge class-variance-authority lucide-react stripe @sendgrid/mail twilio @aws-sdk/client-s3 openai date-fns sharp

npm install -D typescript @types/react @types/node @types/react-dom prisma tsx @types/bcryptjs
```

## 🗄️ Configuration Base de Données

### 1. Créer une base PostgreSQL
```bash
# Avec Docker
docker run --name lebarbier-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=lebarbier -p 5432:5432 -d postgres

# Ou utiliser un service cloud (Vercel Postgres, Supabase, Railway, etc.)
```

### 2. Configurer les Variables d'Environnement
```bash
cp .env.example .env.local
```

Éditer `.env.local` et remplir :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/lebarbier"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-genere"
```

Générer un secret NextAuth :
```bash
openssl rand -base64 32
```

### 3. Initialiser Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Ouvrir Prisma Studio (optionnel)
```bash
npx prisma studio
```

## 🎨 Configuration Tailwind & Shadcn

### 1. Initialiser Shadcn/ui
```bash
npx shadcn-ui@latest init
```

Sélectionner :
- Style: Default
- Base color: Slate
- CSS variables: Yes

### 2. Ajouter des composants
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add calendar
npx shadcn-ui@latest add table
```

## 🚀 Lancer l'Application

### Mode Développement
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Mode Production
```bash
npm run build
npm start
```

## 📝 Scripts Disponibles

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:studio": "prisma studio",
  "db:seed": "tsx prisma/seed.ts"
}
```

## 🔐 Configuration des Services Externes

### SendGrid (Email)
1. Créer un compte sur [sendgrid.com](https://sendgrid.com)
2. Générer une API Key
3. Ajouter dans `.env.local` :
```env
SENDGRID_API_KEY="votre-cle-api"
SENDGRID_FROM_EMAIL="noreply@lebarbier.com"
```

### Twilio (SMS)
1. Créer un compte sur [twilio.com](https://twilio.com)
2. Obtenir Account SID et Auth Token
3. Ajouter dans `.env.local` :
```env
TWILIO_ACCOUNT_SID="votre-account-sid"
TWILIO_AUTH_TOKEN="votre-auth-token"
TWILIO_PHONE_NUMBER="+1234567890"
```

### AWS S3 (Storage)
1. Créer un bucket S3
2. Créer un utilisateur IAM avec accès S3
3. Ajouter dans `.env.local` :
```env
AWS_ACCESS_KEY_ID="votre-access-key"
AWS_SECRET_ACCESS_KEY="votre-secret-key"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="lebarbier-uploads"
```

### OpenAI (Chatbot)
1. Créer un compte sur [platform.openai.com](https://platform.openai.com)
2. Générer une API Key
3. Ajouter dans `.env.local` :
```env
OPENAI_API_KEY="sk-..."
```

### Stripe (Paiements)
1. Créer un compte sur [stripe.com](https://stripe.com)
2. Obtenir les clés API
3. Ajouter dans `.env.local` :
```env
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Orange Money & Mobile Money
Contacter les fournisseurs pour obtenir les credentials API.

## 📱 Tester l'Application

### Comptes de Test (après seed)
- **Admin**: admin@lebarbier.com / admin123
- **Client**: (créer via inscription)
- **Employé**: (créer via admin)

## 🌐 Déploiement

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

### Variables d'Environnement sur Vercel
Ajouter toutes les variables de `.env.local` dans les settings Vercel.

### Base de Données en Production
Utiliser :
- Vercel Postgres
- Supabase
- Railway
- DigitalOcean Managed Databases

## 📚 Documentation

- **API**: `docs/API.md`
- **Architecture**: `docs/ARCHITECTURE.md`
- **Déploiement**: `docs/DEPLOYMENT.md`
- **Contribution**: `docs/CONTRIBUTING.md`

## 🎯 Prochaines Étapes

1. ✅ Installer toutes les dépendances
2. ✅ Configurer la base de données
3. ✅ Configurer les services externes
4. 🔨 Implémenter la logique métier dans les API routes
5. 🔨 Développer les composants UI
6. 🔨 Intégrer les paiements
7. 🔨 Tester les fonctionnalités
8. 🚀 Déployer en production

## ⚠️ Notes Importantes

- Les erreurs TypeScript actuelles sont normales (dépendances non installées)
- Tous les fichiers sont des templates à personnaliser
- Les API routes contiennent uniquement des structures de base
- Les composants sont des placeholders à développer

## 🆘 Support

En cas de problème :
1. Vérifier que toutes les dépendances sont installées
2. Vérifier les variables d'environnement
3. Consulter la documentation Next.js et Prisma
4. Vérifier les logs dans le terminal

## 🎉 Félicitations !

Vous disposez maintenant d'une architecture complète et professionnelle pour votre application Le Barbier !

---

**Créé avec ❤️ pour Le Barbier**
