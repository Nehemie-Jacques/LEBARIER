# ⚡ QUICKSTART - Le Barbier

## 🚀 Démarrage Ultra-Rapide (5 minutes)

### 1️⃣ Installer les Dépendances (2 min)
```bash
npm install
```

### 2️⃣ Configurer la Base de Données (2 min)
```bash
# Copier et éditer .env.local
cp .env.example .env.local

# Ajouter votre DATABASE_URL dans .env.local
# DATABASE_URL="postgresql://user:password@localhost:5432/lebarbier"

# Initialiser Prisma
npx prisma migrate dev
npx prisma db seed
```

### 3️⃣ Lancer l'Application (1 min)
```bash
npm run dev
```

Ouvrir → http://localhost:3000 🎉

---

## 📋 Checklist Rapide

- [ ] ✅ 175 fichiers créés
- [ ] ⚠️ Installer les dépendances (`npm install`)
- [ ] ⚠️ Configurer `.env.local`
- [ ] ⚠️ Initialiser Prisma (`npx prisma migrate dev`)
- [ ] ⚠️ Seed la DB (`npx prisma db seed`)
- [ ] ⚠️ Lancer dev (`npm run dev`)

---

## 🗄️ Base de Données Locale (Docker)

```bash
docker run --name lebarbier-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=lebarbier \
  -p 5432:5432 \
  -d postgres:15
```

Puis dans `.env.local`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/lebarbier"
```

---

## 📚 Documentation Complète

- **Installation**: `GETTING_STARTED.md` (détaillé)
- **Structure**: `STRUCTURE.md`
- **API**: `docs/API.md`
- **Architecture**: `docs/ARCHITECTURE.md`

---

## 🎯 Comptes de Test (après seed)

- **Admin**: `admin@lebarbier.com` / `admin123`

---

## 🆘 Problème ?

1. Vérifier que Node.js >= 18 est installé
2. Vérifier que PostgreSQL est lancé
3. Vérifier les variables dans `.env.local`
4. Consulter `GETTING_STARTED.md`

---

## 📦 Structure Créée

```
le-barbier/
├── 📄 Configuration (9 fichiers)
├── 🗄️ Prisma (schema + seed + migrations)
├── 🖼️ Public (images, icons, fonts)
├── 📱 App (50+ pages Next.js)
├── 🔌 API (31 routes)
├── 🎨 Composants (25+ React)
├── 📚 Lib (15+ utils)
├── 🪝 Hooks (3)
├── 💾 Store (4 Zustand)
├── 🌐 i18n (FR/EN)
├── 📝 Scripts (3)
├── 🧪 Tests (3 dossiers)
└── 📖 Docs (7 fichiers)
```

---

**Total : 137 dossiers, 175 fichiers** ✅

---

## 🎉 C'est tout !

Votre projet est prêt. Consultez `README.md` pour plus d'infos.

**Bon développement ! 🚀**
