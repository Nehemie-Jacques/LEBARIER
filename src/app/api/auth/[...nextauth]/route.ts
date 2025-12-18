/**
 * ============================================
 * 🔐 NEXTAUTH API ROUTE - LE BARBIER
 * ============================================
 * 
 * Route API pour gérer l'authentification avec NextAuth.js v5
 * Compatible avec Next.js App Router
 * 
 * Fonctionnalités:
 * - 🔐 Authentification par email/mot de passe (Credentials)
 * - 🌐 Authentification OAuth (Google)
 * - 🎫 Gestion des sessions JWT
 * - 👤 Gestion des rôles (CLIENT, EMPLOYEE, ADMIN)
 * - 📧 Vérification d'email
 * - 🎁 Programme de fidélité
 * 
 * @see /src/lib/auth.ts - Configuration NextAuth
 * @see /prisma/schema.prisma - Modèles de données
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Handler NextAuth pour les requêtes HTTP
 * Gère automatiquement les routes:
 * - GET  /api/auth/signin
 * - POST /api/auth/signin/credentials
 * - POST /api/auth/signin/google
 * - GET  /api/auth/signout
 * - POST /api/auth/signout
 * - GET  /api/auth/session
 * - GET  /api/auth/csrf
 * - GET  /api/auth/providers
 * - GET  /api/auth/callback/:provider
 * - POST /api/auth/callback/:provider
 */
const handler = NextAuth(authOptions);

// Export des méthodes HTTP supportées par NextAuth
export { handler as GET, handler as POST };

/**
 * ============================================
 * 📝 UTILISATION
 * ============================================
 * 
 * Frontend - Connexion:
 * ```typescript
 * import { signIn } from 'next-auth/react';
 * 
 * // Connexion avec credentials
 * await signIn('credentials', {
 *   email: 'user@example.com',
 *   password: 'password123',
 *   redirect: true,
 *   callbackUrl: '/dashboard'
 * });
 * 
 * // Connexion avec Google
 * await signIn('google', {
 *   redirect: true,
 *   callbackUrl: '/dashboard'
 * });
 * ```
 * 
 * Frontend - Déconnexion:
 * ```typescript
 * import { signOut } from 'next-auth/react';
 * 
 * await signOut({
 *   redirect: true,
 *   callbackUrl: '/'
 * });
 * ```
 * 
 * Frontend - Récupérer la session:
 * ```typescript
 * import { useSession } from 'next-auth/react';
 * 
 * const { data: session, status } = useSession();
 * 
 * if (status === 'authenticated') {
 *   console.log('User:', session.user);
 *   console.log('Role:', session.user.role);
 *   console.log('Loyalty Points:', session.user.loyaltyPoints);
 * }
 * ```
 * 
 * Server Component - Récupérer la session:
 * ```typescript
 * import { auth } from '@/lib/auth';
 * 
 * export default async function Page() {
 *   const session = await auth();
 *   
 *   if (!session) {
 *     redirect('/login');
 *   }
 *   
 *   return <div>Welcome {session.user.name}</div>;
 * }
 * ```
 * 
 * API Route - Protection:
 * ```typescript
 * import { auth } from '@/lib/auth';
 * import { NextResponse } from 'next/server';
 * 
 * export async function GET(req: Request) {
 *   const session = await auth();
 *   
 *   if (!session) {
 *     return NextResponse.json(
 *       { error: 'Non authentifié' },
 *       { status: 401 }
 *     );
 *   }
 *   
 *   // Vérification du rôle
 *   if (session.user.role !== 'ADMIN') {
 *     return NextResponse.json(
 *       { error: 'Accès refusé' },
 *       { status: 403 }
 *     );
 *   }
 *   
 *   return NextResponse.json({ data: 'Protected data' });
 * }
 * ```
 * 
 * Middleware - Protection des routes:
 * ```typescript
 * // middleware.ts
 * import { auth } from '@/lib/auth';
 * import { NextResponse } from 'next/server';
 * 
 * export default auth((req) => {
 *   const isLoggedIn = !!req.auth;
 *   const isAuthRoute = req.nextUrl.pathname.startsWith('/login');
 *   const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
 *   
 *   if (isAdminRoute && req.auth?.user?.role !== 'ADMIN') {
 *     return NextResponse.redirect(new URL('/', req.url));
 *   }
 *   
 *   if (isAuthRoute && isLoggedIn) {
 *     return NextResponse.redirect(new URL('/dashboard', req.url));
 *   }
 *   
 *   return NextResponse.next();
 * });
 * 
 * export const config = {
 *   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
 * };
 * ```
 */

/**
 * ============================================
 * 🔧 CONFIGURATION DES VARIABLES D'ENVIRONNEMENT
 * ============================================
 * 
 * Fichier .env.local:
 * ```env
 * # NextAuth
 * NEXTAUTH_URL="http://localhost:3000"
 * NEXTAUTH_SECRET="your-secret-key-here" # Générer avec: openssl rand -base64 32
 * 
 * # Google OAuth (optionnel)
 * GOOGLE_CLIENT_ID="your-google-client-id"
 * GOOGLE_CLIENT_SECRET="your-google-client-secret"
 * 
 * # Database
 * DATABASE_URL="postgresql://user:password@localhost:5432/lebarbier"
 * ```
 * 
 * Configuration Google OAuth:
 * 1. Aller sur https://console.cloud.google.com
 * 2. Créer un nouveau projet ou sélectionner un existant
 * 3. Activer l'API "Google+ API"
 * 4. Créer des identifiants OAuth 2.0
 * 5. Ajouter les URI de redirection autorisées:
 *    - http://localhost:3000/api/auth/callback/google (dev)
 *    - https://votredomaine.com/api/auth/callback/google (prod)
 * 6. Copier Client ID et Client Secret dans .env.local
 */

/**
 * ============================================
 * 🎯 FLUX D'AUTHENTIFICATION
 * ============================================
 * 
 * 1. INSCRIPTION (Register):
 *    User → POST /api/auth/register → Hash password → Create User → Send verification email
 * 
 * 2. CONNEXION (Login):
 *    User → POST /api/auth/signin/credentials → Verify credentials → Create JWT → Create session
 * 
 * 3. CONNEXION OAUTH (Google):
 *    User → GET /api/auth/signin/google → Redirect to Google → Callback → Create/Update User → Create session
 * 
 * 4. VÉRIFICATION SESSION:
 *    Request → Middleware → Verify JWT → Attach user to request → Continue
 * 
 * 5. DÉCONNEXION (Logout):
 *    User → POST /api/auth/signout → Delete session → Redirect to home
 * 
 * 6. RAFRAÎCHISSEMENT TOKEN:
 *    Client → Check JWT expiry → If expired → Refresh token → Update session
 */

/**
 * ============================================
 * 🛡️ SÉCURITÉ
 * ============================================
 * 
 * - ✅ Mots de passe hashés avec bcrypt (salt rounds: 12)
 * - ✅ JWT signé avec secret fort
 * - ✅ Session expiry: 30 jours
 * - ✅ CSRF protection activé
 * - ✅ Rate limiting recommandé (à implémenter)
 * - ✅ HTTPOnly cookies
 * - ✅ Secure cookies en production
 * - ✅ Email verification
 * - ✅ Account lockout après tentatives échouées (à implémenter)
 */

/**
 * ============================================
 * 📊 LOGS & MONITORING
 * ============================================
 * 
 * Les événements suivants sont loggés:
 * - ✅ Connexion réussie
 * - ✅ Échec de connexion
 * - ✅ Création de compte
 * - ✅ Liaison de compte OAuth
 * - ✅ Déconnexion
 * 
 * Voir: prisma.systemLog pour les logs détaillés
 */

/**
 * ============================================
 * 🐛 DEBUGGING
 * ============================================
 * 
 * Activer les logs en développement:
 * - Les logs détaillés sont activés automatiquement en mode dev
 * - Voir la console pour les erreurs d'authentification
 * - Vérifier les logs dans la base de données (table SystemLog)
 * 
 * Erreurs communes:
 * - "Email ou mot de passe incorrect" → Vérifier les credentials
 * - "Compte désactivé" → Vérifier user.isActive
 * - "Utilisez la connexion via Google" → User sans mot de passe
 * - 401 Unauthorized → Session expirée ou invalide
 * - 403 Forbidden → Rôle insuffisant
 */
