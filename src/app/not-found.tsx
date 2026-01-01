'use client';

import Link from 'next/link';
import { Scissors, Home, Calendar, ShoppingBag, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Eviter l'hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 dark:bg-charcoal-950">
      {/* Debug theme button - Temporary */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <span className="text-xs text-charcoal-600 dark:text-cream-400">
          Thème: {currentTheme} {theme === 'system' && '(auto)'}
        </span>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 bg-gold-500 text-charcoal-950 rounded-full hover:bg-gold-600 transition-colors"
        >
          {currentTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setTheme('system')}
          className="px-3 py-1 bg-charcoal-800 text-cream-50 text-xs rounded-full hover:bg-charcoal-700 transition-colors"
        >
          Auto
        </button>
      </div>
      {/* Header */}
      <header className="w-full px-6 md:px-12 py-4 bg-white dark:bg-charcoal-950 border-b border-cream-200 dark:border-charcoal-800">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Scissors className="w-10 h-10 text-gold-500" />
            <span className="text-xl font-serif font-bold text-charcoal-900 tracking-wide">
              LE BARBIER
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-charcoal-800 dark:text-cream-200 hover:text-gold-500 dark:hover:text-gold-400 transition-colors">
              Accueil
            </Link>
            <Link href="/services" className="text-sm text-charcoal-800 dark:text-cream-200 hover:text-gold-500 dark:hover:text-gold-400 transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-sm text-charcoal-800 dark:text-cream-200 hover:text-gold-500 dark:hover:text-gold-400 transition-colors">
              À Propos
            </Link>
            <Link href="/contact" className="text-sm text-charcoal-800 dark:text-cream-200 hover:text-gold-500 dark:hover:text-gold-400 transition-colors">
              Contact
            </Link>
          </nav>

          <Link
            href="/booking"
            className="px-6 py-2 bg-gold-500 hover:bg-gold-600 text-charcoal-900 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Réserver
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Numéro 404 avec ciseaux en arrière-plan */}
        <div className="relative mb-8">
          {/* Ciseaux en arrière-plan (gris clair) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-6">
            <Scissors className="w-64 h-64 text-charcoal-600 dark:text-cream-200 transform rotate-60" />
          </div>

          {/* Numéro 404 */}
          <div className="relative flex items-center justify-center">
            <h1 className="text-[180px] md:text-[220px] font-bold leading-none tracking-tighter">
              <span className="text-charcoal-950 dark:text-cream-50">4</span>
              <span className="text-gold-500">0</span>
              <span className="text-charcoal-950 dark:text-cream-50">4</span>
            </h1>
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal-950 dark:text-cream-50 mb-4 text-center">
          Oups ! Page Non Trouvée
        </h2>

        {/* Description */}
        <p className="text-center text-charcoal-600 dark:text-cream-400 max-w-md mb-8 leading-relaxed">
          Il semble que vous ayez pris un mauvais virage, ou peut-être que cette page a eu une coupe un peu trop courte. Ne vous inquiétez pas, nous pouvons vous remettre sur le droit chemin.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-semibold rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 text-charcoal-900" />
            RETOUR À L&apos;ACCUEIL
          </Link>
          <Link
            href="/booking"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-charcoal-900 border-2 border-charcoal-200 dark:border-charcoal-700 text-charcoal-900 dark:text-cream-50 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 font-semibold rounded-full transition-all"
          >
            <Calendar className="w-5 h-5 text-charcoal-900 dark:text-cream-50" />
            PRENDRE RENDEZ-VOUS
          </Link>
        </div>

        {/* Ligne de séparation */}
        <div className="w-full max-w-4xl mb-12">
          <div className="h-px bg-cream-300 dark:bg-charcoal-800"></div>
        </div>

        {/* Suggestions populaires */}
        <div className="w-full max-w-2xl mb-16">
          <h3 className="text-sm font-semibold text-charcoal-500 dark:text-cream-500 text-center mb-8 tracking-wider">
            SUGGESTIONS POPULAIRES
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Nos Coupes */}
            <Link
              href="/services/coupes"
              className="group flex flex-col items-center gap-3 p-6 bg-white dark:bg-charcoal-900 rounded-2xl hover:shadow-lg dark:hover:shadow-2xl transition-all border border-cream-200 dark:border-charcoal-800"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-gold-100 dark:bg-gold-900/20 rounded-full group-hover:scale-110 transition-transform">
                <Scissors className="w-7 h-7 text-gold-600 dark:text-gold-500" />
              </div>
              <span className="text-sm font-medium text-charcoal-900 dark:text-cream-100">
                Nos Coupes
              </span>
            </Link>

            {/* Barbe & Soins */}
            <Link
              href="/services/barbe"
              className="group flex flex-col items-center gap-3 p-6 bg-white dark:bg-charcoal-900 rounded-2xl hover:shadow-lg dark:hover:shadow-2xl transition-all border border-cream-200 dark:border-charcoal-800"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-gold-100 dark:bg-gold-900/20 rounded-full group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-gold-600 dark:text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-charcoal-900 dark:text-cream-100">
                Barbe & Soins
              </span>
            </Link>

            {/* La Boutique */}
            <Link
              href="/shop"
              className="group flex flex-col items-center gap-3 p-6 bg-white dark:bg-charcoal-900 rounded-2xl hover:shadow-lg dark:hover:shadow-2xl transition-all border border-cream-200 dark:border-charcoal-800"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-gold-100 dark:bg-gold-900/20 rounded-full group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-7 h-7 text-gold-600 dark:text-gold-500" />
              </div>
              <span className="text-sm font-medium text-charcoal-900 dark:text-cream-100">
                La Boutique
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 bg-white dark:bg-charcoal-950 border-t border-cream-200 dark:border-charcoal-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Scissors className="w-10 h-10 text-gold-500" />
              <span className="text-xl font-serif font-bold text-charcoal-900 dark:text-cream-50">
                LE BARBIER
              </span>
            </div>

            {/* Liens légaux */}
            <div className="flex items-center gap-6">
              <Link href="/legal" className="text-sm text-charcoal-600 dark:text-cream-400 hover:text-gold-500 transition-colors">
                Mentions Légales
              </Link>
              <Link href="/privacy" className="text-sm text-charcoal-600 dark:text-cream-400 hover:text-gold-500 transition-colors">
                Confidentialité
              </Link>
              <Link href="/terms" className="text-sm text-charcoal-600 dark:text-cream-400 hover:text-gold-500 transition-colors">
                CGV
              </Link>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-charcoal-400 dark:text-cream-500 hover:text-gold-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>
              <a href="#" className="text-charcoal-400 dark:text-cream-500 hover:text-gold-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs text-charcoal-500 dark:text-cream-600">
              © 2024 Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
