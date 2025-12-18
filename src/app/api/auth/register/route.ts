/**
 * ============================================
 * 📝 INSCRIPTION UTILISATEUR - LE BARBIER
 * ============================================
 * 
 * Endpoint pour créer un nouveau compte utilisateur
 * 
 * @route POST /api/auth/register
 * @access Public
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

/**
 * Schéma de validation pour l'inscription
 */
const registerSchema = z.object({
  email: z.string().email('📧 Email invalide'),
  password: z
    .string()
    .min(8, '🔒 Le mot de passe doit contenir au moins 8 caractères')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      '🔒 Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre'
    ),
  firstName: z.string().min(2, '👤 Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, '👤 Le nom doit contenir au moins 2 caractères'),
  phone: z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/, '📱 Numéro de téléphone invalide'),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: '📋 Vous devez accepter les conditions générales',
  }),
});

/**
 * POST /api/auth/register
 * Créer un nouveau compte utilisateur
 */
export async function POST(request: Request) {
  try {
    // 📥 Récupération et validation des données
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // 🔍 Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '❌ Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    // 🔐 Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // 👤 Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        role: 'CLIENT',
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

    // 📧 TODO: Envoyer un email de vérification
    // await sendVerificationEmail(user.email, user.id);

    // 📝 Logger l'événement
    await prisma.systemLog.create({
      data: {
        level: 'INFO',
        message: `✅ Nouvel utilisateur inscrit: ${user.email}`,
        context: {
          userId: user.id,
          email: user.email,
        },
      },
    });

    // ✅ Retour de succès
    return NextResponse.json(
      {
        success: true,
        message: '🎉 Compte créé avec succès ! Vérifiez votre email.',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('🚨 Erreur inscription:', error);

    // Erreur de validation Zod
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: '❌ Données invalides',
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Erreur Prisma (contrainte unique, etc.)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: '❌ Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    // Erreur générique
    return NextResponse.json(
      { error: '❌ Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
}

/**
 * ============================================
 * 📝 UTILISATION
 * ============================================
 * 
 * Frontend - Formulaire d'inscription:
 * ```typescript
 * const handleRegister = async (data: RegisterFormData) => {
 *   try {
 *     const response = await fetch('/api/auth/register', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify({
 *         email: data.email,
 *         password: data.password,
 *         firstName: data.firstName,
 *         lastName: data.lastName,
 *         phone: data.phone,
 *         acceptTerms: data.acceptTerms,
 *       }),
 *     });
 * 
 *     const result = await response.json();
 * 
 *     if (!response.ok) {
 *       throw new Error(result.error);
 *     }
 * 
 *     // Succès - rediriger vers la page de connexion
 *     router.push('/login?registered=true');
 *   } catch (error) {
 *     console.error('Erreur inscription:', error);
 *     setError(error.message);
 *   }
 * };
 * ```
 * 
 * Exemple de réponse succès:
 * ```json
 * {
 *   "success": true,
 *   "message": "🎉 Compte créé avec succès ! Vérifiez votre email.",
 *   "user": {
 *     "id": "clx123abc",
 *     "email": "jean@example.com",
 *     "firstName": "Jean",
 *     "lastName": "Dupont"
 *   }
 * }
 * ```
 * 
 * Exemple de réponse erreur:
 * ```json
 * {
 *   "error": "❌ Données invalides",
 *   "details": [
 *     {
 *       "field": "email",
 *       "message": "📧 Email invalide"
 *     },
 *     {
 *       "field": "password",
 *       "message": "🔒 Le mot de passe doit contenir au moins 8 caractères"
 *     }
 *   ]
 * }
 * ```
 */
