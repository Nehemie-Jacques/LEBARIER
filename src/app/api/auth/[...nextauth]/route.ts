/**
 * 🔐 API Route Handler pour NextAuth.js v5
 * 
 * Ce fichier gère toutes les routes d'authentification de l'application :
 * - POST /api/auth/signin - Connexion
 * - POST /api/auth/signout - Déconnexion
 * - GET /api/auth/session - Récupérer la session
 * - GET /api/auth/csrf - Token CSRF
 * - GET /api/auth/providers - Liste des providers
 * 
 * NextAuth gère automatiquement toutes ces routes via le système [...nextauth]
 */

import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
