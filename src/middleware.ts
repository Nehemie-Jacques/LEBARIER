import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

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

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Si l'utilisateur est connecté et essaie d'accéder aux pages d'auth
  if (session && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  // Protection des routes utilisateurs
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!session) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protection des routes employés
  if (employeeRoutes.some((route) => pathname.startsWith(route))) {
    if (!session) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = (session.user as any)?.role;
    if (userRole !== 'EMPLOYEE' && userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
  }

  // Protection des routes admin
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!session) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = (session.user as any)?.role;
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/profile', req.url));
    }
  }

  return NextResponse.next();
});

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