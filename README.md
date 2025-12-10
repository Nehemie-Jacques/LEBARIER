# Le Barbier 💈

Application web moderne pour la gestion d'un salon de coiffure avec système de réservation en ligne, boutique e-commerce et espace administrateur complet.

## 🚀 Fonctionnalités

### Pour les Clients
- ✅ Réservation de rendez-vous en ligne
- 🛒 Boutique de produits capillaires
- 💳 Paiements (Orange Money, Mobile Money, Stripe)
- ⭐ Système de fidélité
- 📱 Notifications (Email & SMS)
- 💬 Chatbot AI pour assistance
- 🌐 Support multilingue (FR/EN)

### Pour les Employés
- 📅 Gestion du planning
- 📊 Statistiques personnelles
- 🖼️ Portfolio de réalisations
- 🔔 Notifications de rendez-vous

### Pour les Administrateurs
- 📈 Dashboard complet
- 👥 Gestion des utilisateurs et employés
- 💼 Gestion des services et produits
- 💰 Suivi des commandes et paiements
- 📊 Analytics détaillés
- ✉️ Marketing et contenu

## 🛠️ Technologies

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Payments**: Orange Money, Mobile Money, Stripe
- **Email**: SendGrid
- **SMS**: Twilio
- **Storage**: AWS S3
- **AI**: OpenAI
- **Analytics**: Google Analytics

## 📦 Installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/le-barbier.git
cd le-barbier
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```
Remplissez les variables dans `.env.local`

4. **Initialiser la base de données**
```bash
npx prisma migrate dev
npx prisma db seed
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
le-barbier/
├── prisma/              # Schéma DB & migrations
├── public/              # Assets statiques
├── src/
│   ├── app/             # Pages Next.js (App Router)
│   │   ├── (auth)/      # Pages d'authentification
│   │   ├── (main)/      # Pages principales
│   │   ├── booking/     # Système de réservation
│   │   ├── shop/        # Boutique
│   │   ├── profile/     # Espace client
│   │   ├── employee/    # Espace employé
│   │   ├── admin/       # Dashboard admin
│   │   └── api/         # API Routes
│   ├── components/      # Composants React
│   ├── lib/             # Utilitaires & configs
│   ├── hooks/           # Custom hooks
│   ├── store/           # Zustand stores
│   ├── types/           # Types TypeScript
│   ├── i18n/            # Traductions
│   └── styles/          # Styles globaux
├── scripts/             # Scripts utilitaires
├── tests/               # Tests
└── docs/                # Documentation
```

## 🔑 Variables d'Environnement

Voir `.env.example` pour la liste complète des variables requises.

## 🧪 Tests

```bash
# Tests unitaires
npm run test:unit

# Tests d'intégration
npm run test:integration

# Tests E2E
npm run test:e2e
```

## 🚀 Déploiement

Voir [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) pour les instructions détaillées.

### Déploiement rapide sur Vercel

```bash
npm install -g vercel
vercel
```

## 📖 Documentation

- [API Documentation](docs/API.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Contributing Guide](docs/CONTRIBUTING.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](docs/CONTRIBUTING.md) pour plus d'informations.

## 📝 License

Ce projet est sous licence MIT.

## 👥 Auteurs

- **Votre Nom** - Développeur principal

## 🙏 Remerciements

- Shadcn/ui pour les composants UI
- Vercel pour l'hébergement
- La communauté Next.js

---

Fait avec ❤️ pour Le Barbier
