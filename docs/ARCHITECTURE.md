# Architecture

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **UI Components**: Shadcn/ui
- **Email**: SendGrid
- **SMS**: Twilio
- **Storage**: AWS S3
- **Payments**: Orange Money, Mobile Money, Stripe
- **AI**: OpenAI
- **Analytics**: Google Analytics

## Project Structure
```
le-barbier/
├── prisma/              # Database schema & migrations
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   ├── lib/             # Utilities & configurations
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand stores
│   ├── types/           # TypeScript types
│   ├── i18n/            # Internationalization
│   └── styles/          # Global styles
├── scripts/             # Utility scripts
├── tests/               # Test files
└── docs/                # Documentation
```

## Features
- User authentication (Client, Employee, Admin)
- Appointment booking system
- E-commerce for products
- Employee management
- Admin dashboard
- Loyalty program
- Reviews & ratings
- AI chatbot
- Multi-language support
- Payment integrations
- Email & SMS notifications
