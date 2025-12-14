import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Routes qui nécessitent une authentification
const protectedRoutes = [
  '/profile',
  '/booking',
  '/orders',
  '/favorites',
];

// Routes réservées aux employés
const employeeRoutes = [
  '/employee',
];

// Routes réservées aux administrateurs
const adminRoutes = [
  '/admin',
];

// Routes accessibles uniquement si NON connecté
const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Récupérer le token JWT
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Si l'utilisateur est connecté et essaie d'accéder aux pages d'auth
  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Protection des routes utilisateurs
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protection des routes employés
  if (employeeRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (token.role !== 'EMPLOYEE' && token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }

  // Protection des routes admin
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }

  // Vérifier si le compte est actif
  if (token && !token.isActive && !authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/account-disabled', request.url));
  }

  return NextResponse.next();
}

// Configuration du matcher pour optimiser les performances
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons|fonts).*)',
  ],
};