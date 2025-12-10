# Deployment Guide

## Prerequisites
- Node.js 18+
- PostgreSQL database
- Environment variables configured

## Steps

1. Install dependencies
```bash
npm install
```

2. Setup database
```bash
npx prisma migrate deploy
npx prisma db seed
```

3. Build application
```bash
npm run build
```

4. Start production server
```bash
npm start
```

## Environment Variables
See `.env.example` for required environment variables.

## Deployment Platforms
- Vercel (recommended)
- Railway
- Heroku
- DigitalOcean
