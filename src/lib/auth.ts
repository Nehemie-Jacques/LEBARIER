import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema de validation pour le login
const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as any,

  providers: [
    // Authentification par email et mot de passe
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Validation des crédentials
          const validatesCredentials = loginSchema.parse(credentials);

          // Recherche de l'utilisateur dans la base de données
          const user = await prisma.user.findUnique({
            where: { email: validatesCredentials.email },
            include: {
              employee: true,
            },
          });

          // Vérification de l'existence de l'utilisateur et du mot de passe
          if (!user) {
            throw new Error('Email ou mot de passe incorrect');
          }

          if (!user.password) {
            throw new Error('Utilisez la connexion via Google');
          }

          // Vérification du mot de passe
          const isValid = await bcrypt.compare(
            validatesCredentials.password,
            user.password!
          );

          if (!isValid) {
            throw new Error('Email ou mot de passe incorrect');
          }

          // Retour des données utilisateur
          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            emailVerified: user.emailVerified,
            loyaltyPoints: user.loyaltyPoints,
            loyaltyTier: user.loyaltyTier,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      },
    }),

    //Authentification via Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  // Pages personnalisées pour l'authentification
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
    verifyRequest: '/verify-email',
    newUser: '/onboarding', // Redirection après la création d'un nouvel utilisateur
  },

  // Configuration des sessions
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 jours
    updateAge: 24 * 60 * 60, // 24 heures
  },

  // Configuration des JWT

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },

  // Callbacks pour personnaliser le comportement de NextAuth
  callbacks: {
    // Callback JWT - Ajout des informations utilisateur au token JWT
    async jwt({ token, user, trigger, session }) {
      // Première connexion - ajout des informations utilisateur au token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
        token.loyaltyPoints = user.loyaltyPoints;
        token.loyaltyTier = user.loyaltyTier;
        token.emailVerified = user.emailVerified;
      }

      // Mise de la session
      if (token.id) {
        const freshUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            id: true,
            email: true,
            role: true,
            firstName: true,
            lastName: true,
            phone: true,
            avatar: true,
            loyaltyPoints: true,
            loyaltyTier: true,
            isActive: true,
            emailVerified: true,
          },
        });

        if (freshUser) {
          token.role = freshUser.role;
          token.firstName = freshUser.firstName;
          token.lastName = freshUser.lastName;
          token.loyaltyPoints = freshUser.loyaltyPoints;
          token.loyaltyTier = freshUser.loyaltyTier;
          token.isActive = freshUser.isActive;
          token.emailVerified = freshUser.emailVerified;
          token.picture = freshUser.avatar;
        }
      }

      return token;
    },

    // Callback Session - Ajout des informations utilisateur à la session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.phone = token.phone as string;
        session.user.loyaltyPoints = token.loyaltyPoints as number;
        session.user.loyaltyTier = token.loyaltyTier as string;
        session.user.emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },

    // Callback Redirect - Redirection après la connexion
    async redirect({ url, baseUrl }) {
      // Redirection vers l'URL d'origine si elle appartient au même domaine
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Sinon, redirection vers la page d'accueil
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    // Callback SignIn - Contrôle d'accès lors de la connexion
    async signIn({ user, account, profile }) {
      // Si l'utilisateur utilise Google, vérifier s'il est actif
      if (profile?.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        // Si l'utilisateur existe déjà, mettre à jour son statut actif
        if (existingUser) {
          await prisma.user.update({
            where: { email: profile.email },
            data: {
              emailVerified: new Date(),
              avatar: profile.picture,
            },
          });
        } else {
          // Si l'utilisateur n'existe pas, le créer
          const [firstName, ...lastNameParts] = (profile.name || '').split(' ');
          await prisma.user.create({
            data: {
              email: profile.email,
              firstName: firstName || 'Prénom',
              lastName: lastNameParts.join(' ') || 'Nom',
              avatar: profile.picture,
              emailVerified: new Date(),
              role: 'CLIENT',
              phone: '', // À compléter lors de l'onboarding  
            },
          });
        }
      }

      // Pour les credentials, vérifier que l'utilisateur est actif
      if(account?.provider === 'credentials') {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (!dbUser?.isActive) {
          throw new Error('Compte désactivé');
        }
      }
      
      return true; // Autoriser la connexion
    }
  },
};