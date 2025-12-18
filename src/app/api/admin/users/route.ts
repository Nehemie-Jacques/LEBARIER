/**
 * ============================================
 * 👑 API ADMIN USERS - LE BARBIER
 * ============================================
 * 
 * Endpoint pour que les administrateurs gèrent tous les utilisateurs
 * Accessible uniquement aux ADMIN
 * 
 * @route GET/POST/PUT/DELETE /api/admin/users
 */

import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

/**
 * 👥 Récupérer tous les utilisateurs (Admin seulement)
 * 
 * @method GET
 * @returns {Promise<NextResponse>} Liste des utilisateurs
 * 
 * @example Postman
 * GET http://localhost:3001/api/admin/users
 * Headers: Cookie: (le cookie de session de l'admin)
 * 
 * @example Query params
 * ?role=CLIENT (filtrer par rôle)
 * ?search=john (rechercher par nom/email)
 * ?isActive=true (filtrer par statut actif)
 */
export async function GET(req: Request) {
  // Vérifier que l'utilisateur est admin
  const { user, error, status } = await requireAdmin();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const { searchParams } = new URL(req.url);
    const roleFilter = searchParams.get('role');
    const searchQuery = searchParams.get('search');
    const isActiveFilter = searchParams.get('isActive');

    // Construire les filtres
    const where: any = {};

    if (roleFilter) {
      where.role = roleFilter;
    }

    if (isActiveFilter !== null) {
      where.isActive = isActiveFilter === 'true';
    }

    if (searchQuery) {
      where.OR = [
        { email: { contains: searchQuery, mode: 'insensitive' } },
        { firstName: { contains: searchQuery, mode: 'insensitive' } },
        { lastName: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }

    // Récupérer les utilisateurs
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        avatar: true,
        language: true,
        loyaltyPoints: true,
        loyaltyTier: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        // Ne jamais exposer le mot de passe
        password: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Statistiques
    const stats = {
      total: users.length,
      byRole: {
        CLIENT: users.filter((u) => u.role === 'CLIENT').length,
        EMPLOYEE: users.filter((u) => u.role === 'EMPLOYEE').length,
        ADMIN: users.filter((u) => u.role === 'ADMIN').length,
      },
      active: users.filter((u) => u.isActive).length,
      inactive: users.filter((u) => !u.isActive).length,
    };

    return NextResponse.json({
      success: true,
      count: users.length,
      stats,
      users,
    });
  } catch (error) {
    console.error('🚨 Erreur lors de la récupération des utilisateurs:', error);
    
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    );
  }
}

/**
 * ➕ Créer un nouvel utilisateur (Admin seulement)
 * 
 * @method POST
 * @returns {Promise<NextResponse>} Utilisateur créé
 * 
 * @example Postman
 * POST http://localhost:3001/api/admin/users
 * Headers: Cookie: (le cookie de session de l'admin)
 * Body: {
 *   "email": "newuser@example.com",
 *   "password": "SecurePass123!",
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "phone": "+237600000000",
 *   "role": "CLIENT"
 * }
 */
export async function POST(req: Request) {
  const { user, error, status } = await requireAdmin();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const body = await req.json();
    const { email, password, firstName, lastName, phone, role } = body;

    // Validation
    if (!email || !password || !firstName || !lastName || !phone) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un utilisateur avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: role || 'CLIENT',
        isActive: true,
        loyaltyPoints: 0,
        loyaltyTier: 'BRONZE',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    console.log('✅ Utilisateur créé par admin:', newUser.email);

    return NextResponse.json({
      success: true,
      message: 'Utilisateur créé avec succès',
      user: newUser,
    }, { status: 201 });
  } catch (error) {
    console.error('🚨 Erreur lors de la création de l\'utilisateur:', error);
    
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'utilisateur' },
      { status: 500 }
    );
  }
}
