/**
 * ============================================
 * 🚪 API LOGOUT - LE BARBIER
 * ============================================
 * 
 * Endpoint pour déconnecter un utilisateur
 * Compatible avec tous les rôles (CLIENT, EMPLOYEE, ADMIN)
 * 
 * @route POST /api/auth/logout
 */

import { signOut } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

/**
 * 🚪 Déconnecter l'utilisateur
 * 
 * @method POST
 * @returns {Promise<NextResponse>} Réponse JSON
 * 
 * @example Postman
 * POST http://localhost:3001/api/auth/logout
 * Headers: Cookie: (le cookie de session)
 * 
 * @example Frontend
 * ```typescript
 * const response = await fetch('/api/auth/logout', {
 *   method: 'POST',
 * });
 * 
 * if (response.ok) {
 *   window.location.href = '/login';
 * }
 * ```
 */
export async function POST() {
  try {
    // Vérifier si l'utilisateur est connecté
    const { user } = await getAuthenticatedUser();

    if (user) {
      console.log('🚪 Déconnexion de:', user.email);
    }

    // Déconnecter l'utilisateur
    await signOut({ redirect: false });

    return NextResponse.json({
      success: true,
      message: 'Déconnexion réussie',
    });
  } catch (error) {
    console.error('🚨 Erreur lors de la déconnexion:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de la déconnexion',
      },
      { status: 500 }
    );
  }
}

/**
 * 🚪 Déconnecter l'utilisateur (GET pour compatibilité)
 * 
 * @method GET
 * @returns {Promise<NextResponse>} Réponse JSON
 */
export async function GET() {
  return POST();
}
