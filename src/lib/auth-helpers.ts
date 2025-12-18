/**
 * ============================================
 * 🔐 AUTH HELPERS - LE BARBIER
 * ============================================
 * 
 * Fonctions utilitaires pour l'authentification et l'autorisation
 * Simplifie la vérification des rôles dans les API routes et Server Components
 * 
 * @example
 * ```typescript
 * // Dans une API route
 * import { requireAdmin } from '@/lib/auth-helpers';
 * 
 * export async function GET() {
 *   const { user, error, status } = await requireAdmin();
 *   
 *   if (error) {
 *     return NextResponse.json({ error }, { status });
 *   }
 *   
 *   // L'utilisateur est admin, on peut continuer...
 * }
 * ```
 */

import { auth } from '@/lib/auth';

export type UserRole = 'CLIENT' | 'EMPLOYEE' | 'ADMIN';

export interface AuthResult {
  user: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    phone: string;
    image?: string;
  } | null;
  error: string | null;
  status: number;
}

/**
 * 🔐 Récupère la session et vérifie l'authentification
 * 
 * @returns {Promise<AuthResult>} Résultat de l'authentification
 * 
 * @example
 * ```typescript
 * const { user, error, status } = await getAuthenticatedUser();
 * 
 * if (error) {
 *   return NextResponse.json({ error }, { status });
 * }
 * 
 * console.log('Utilisateur connecté:', user.email);
 * ```
 */
export async function getAuthenticatedUser(): Promise<AuthResult> {
  const session = await auth();

  if (!session) {
    return {
      user: null,
      error: 'Non authentifié',
      status: 401,
    };
  }

  const user = session.user as any;

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      image: user.image,
    },
    error: null,
    status: 200,
  };
}

/**
 * 🛡️ Vérifie si l'utilisateur a l'un des rôles requis
 * 
 * @param {UserRole[]} allowedRoles - Liste des rôles autorisés
 * @returns {Promise<AuthResult>} Résultat de la vérification
 * 
 * @example
 * ```typescript
 * // Autoriser EMPLOYEE et ADMIN
 * const { user, error, status } = await requireRole(['EMPLOYEE', 'ADMIN']);
 * 
 * if (error) {
 *   return NextResponse.json({ error }, { status });
 * }
 * 
 * console.log('Utilisateur autorisé:', user.role);
 * ```
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<AuthResult> {
  const { user, error, status } = await getAuthenticatedUser();

  if (error) {
    return { user: null, error, status };
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return {
      user: null,
      error: `Accès refusé - Rôle requis: ${allowedRoles.join(' ou ')}`,
      status: 403,
    };
  }

  return { user, error: null, status: 200 };
}

/**
 * 👑 Vérifie si l'utilisateur est un administrateur
 * 
 * @returns {Promise<AuthResult>} Résultat de la vérification
 * 
 * @example
 * ```typescript
 * // API route réservée aux admins
 * export async function DELETE(req: Request) {
 *   const { user, error, status } = await requireAdmin();
 *   
 *   if (error) {
 *     return NextResponse.json({ error }, { status });
 *   }
 *   
 *   // L'utilisateur est admin, on peut supprimer...
 *   await prisma.user.delete({ where: { id: params.id } });
 * }
 * ```
 */
export async function requireAdmin(): Promise<AuthResult> {
  return requireRole(['ADMIN']);
}

/**
 * 👔 Vérifie si l'utilisateur est un employé ou un admin
 * 
 * @returns {Promise<AuthResult>} Résultat de la vérification
 * 
 * @example
 * ```typescript
 * // API route pour les employés et admins
 * export async function GET() {
 *   const { user, error, status } = await requireEmployee();
 *   
 *   if (error) {
 *     return NextResponse.json({ error }, { status });
 *   }
 *   
 *   // L'utilisateur est employé ou admin
 *   const appointments = await prisma.appointment.findMany({
 *     where: { employeeId: user.id },
 *   });
 * }
 * ```
 */
export async function requireEmployee(): Promise<AuthResult> {
  return requireRole(['EMPLOYEE', 'ADMIN']);
}

/**
 * 🔓 Vérifie si l'utilisateur est authentifié (tous rôles)
 * 
 * @returns {Promise<AuthResult>} Résultat de la vérification
 * 
 * @example
 * ```typescript
 * // API route accessible à tous les utilisateurs connectés
 * export async function GET() {
 *   const { user, error, status } = await requireAuth();
 *   
 *   if (error) {
 *     return NextResponse.json({ error }, { status });
 *   }
 *   
 *   // N'importe quel utilisateur connecté peut accéder
 *   const profile = await prisma.user.findUnique({
 *     where: { id: user.id },
 *   });
 * }
 * ```
 */
export async function requireAuth(): Promise<AuthResult> {
  return requireRole(['CLIENT', 'EMPLOYEE', 'ADMIN']);
}

/**
 * 🧑‍💼 Vérifie si l'utilisateur est un client
 * 
 * @returns {Promise<AuthResult>} Résultat de la vérification
 * 
 * @example
 * ```typescript
 * // API route réservée aux clients
 * export async function POST(req: Request) {
 *   const { user, error, status } = await requireClient();
 *   
 *   if (error) {
 *     return NextResponse.json({ error }, { status });
 *   }
 *   
 *   // L'utilisateur est un client
 *   const booking = await prisma.appointment.create({
 *     data: { customerId: user.id, ... },
 *   });
 * }
 * ```
 */
export async function requireClient(): Promise<AuthResult> {
  return requireRole(['CLIENT']);
}

/**
 * 🔍 Vérifie si l'utilisateur connecté est le propriétaire de la ressource
 * 
 * @param {string} resourceUserId - ID de l'utilisateur propriétaire de la ressource
 * @returns {Promise<AuthResult & { isOwner: boolean }>} Résultat avec flag isOwner
 * 
 * @example
 * ```typescript
 * // Vérifier si l'utilisateur peut modifier son propre profil
 * export async function PUT(req: Request, { params }: { params: { id: string } }) {
 *   const { user, error, status, isOwner } = await requireOwner(params.id);
 *   
 *   if (error) {
 *     return NextResponse.json({ error }, { status });
 *   }
 *   
 *   if (!isOwner && user.role !== 'ADMIN') {
 *     return NextResponse.json(
 *       { error: 'Vous ne pouvez modifier que votre propre profil' },
 *       { status: 403 }
 *     );
 *   }
 *   
 *   // L'utilisateur est propriétaire ou admin, on peut modifier...
 * }
 * ```
 */
export async function requireOwner(
  resourceUserId: string
): Promise<AuthResult & { isOwner: boolean }> {
  const { user, error, status } = await getAuthenticatedUser();

  if (error) {
    return { user: null, error, status, isOwner: false };
  }

  const isOwner = user?.id === resourceUserId;

  return { user, error: null, status: 200, isOwner };
}

/**
 * 🎯 Vérifie si l'utilisateur peut accéder à une ressource
 * (propriétaire ou admin)
 * 
 * @param {string} resourceUserId - ID de l'utilisateur propriétaire de la ressource
 * @returns {Promise<AuthResult & { canAccess: boolean }>} Résultat avec flag canAccess
 * 
 * @example
 * ```typescript
 * // Vérifier l'accès à un rendez-vous
 * export async function GET(req: Request, { params }: { params: { id: string } }) {
 *   const appointment = await prisma.appointment.findUnique({
 *     where: { id: params.id },
 *   });
 *   
 *   const { user, error, status, canAccess } = await canAccessResource(
 *     appointment.customerId
 *   );
 *   
 *   if (error || !canAccess) {
 *     return NextResponse.json(
 *       { error: 'Accès refusé' },
 *       { status: 403 }
 *     );
 *   }
 *   
 *   return NextResponse.json(appointment);
 * }
 * ```
 */
export async function canAccessResource(
  resourceUserId: string
): Promise<AuthResult & { canAccess: boolean }> {
  const { user, error, status, isOwner } = await requireOwner(resourceUserId);

  if (error) {
    return { user: null, error, status, canAccess: false };
  }

  // L'utilisateur peut accéder s'il est propriétaire ou admin
  const canAccess = isOwner || user?.role === 'ADMIN';

  return { user, error: null, status: 200, canAccess };
}

/**
 * 📊 Récupère les informations de session sans erreur
 * Utile pour les composants qui affichent différemment selon l'état de connexion
 * 
 * @returns {Promise<{ session: any; user: any; isAuthenticated: boolean }>}
 * 
 * @example
 * ```typescript
 * // Dans un Server Component
 * export default async function Header() {
 *   const { user, isAuthenticated } = await getSession();
 *   
 *   return (
 *     <header>
 *       {isAuthenticated ? (
 *         <p>Bonjour {user.firstName}</p>
 *       ) : (
 *         <a href="/login">Se connecter</a>
 *       )}
 *     </header>
 *   );
 * }
 * ```
 */
export async function getSession() {
  const session = await auth();

  return {
    session,
    user: session?.user || null,
    isAuthenticated: !!session,
  };
}
