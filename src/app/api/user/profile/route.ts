/**
 * ============================================
 * 📊 API PROFILE - LE BARBIER
 * ============================================
 * 
 * Endpoint pour récupérer le profil de l'utilisateur connecté
 * Accessible à tous les utilisateurs authentifiés
 * 
 * @route GET /api/user/profile
 */

import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';

/**
 * 📊 Récupérer le profil de l'utilisateur connecté
 * 
 * @method GET
 * @returns {Promise<NextResponse>} Profil utilisateur
 * 
 * @example Postman
 * GET http://localhost:3001/api/user/profile
 * Headers: Cookie: (le cookie de session)
 */
export async function GET() {
  // Vérifier l'authentification (tous rôles acceptés)
  const { user, error, status } = await requireAuth();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    // Récupérer les informations complètes de l'utilisateur
    const fullUser = await prisma.user.findUnique({
      where: { id: user!.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        language: true,
        loyaltyPoints: true,
        loyaltyTier: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!fullUser) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: fullUser,
    });
  } catch (error) {
    console.error('🚨 Erreur lors de la récupération du profil:', error);
    
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du profil' },
      { status: 500 }
    );
  }
}

/**
 * ✏️ Mettre à jour le profil de l'utilisateur connecté
 * 
 * @method PUT
 * @returns {Promise<NextResponse>} Profil mis à jour
 * 
 * @example Postman
 * PUT http://localhost:3001/api/user/profile
 * Headers: Cookie: (le cookie de session)
 * Body: {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "phone": "+237600000000",
 *   "language": "FR"
 * }
 */
export async function PUT(req: Request) {
  const { user, error, status } = await requireAuth();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const body = await req.json();
    const { firstName, lastName, phone, language } = body;

    // Mettre à jour le profil
    const updatedUser = await prisma.user.update({
      where: { id: user!.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(phone && { phone }),
        ...(language && { language }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        language: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user: updatedUser,
    });
  } catch (error) {
    console.error('🚨 Erreur lors de la mise à jour du profil:', error);
    
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du profil' },
      { status: 500 }
    );
  }
}
