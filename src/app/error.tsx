'use client';

import { useEffect } from 'react';
import { AlertCircle, RotateCcw, Home, Bot, Scissors } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Erreur capturée:', error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col bg-cream-100 dark:bg-charcoal-900 overflow-hidden">
      <header className="w-full px-6 md:px-20 py-4 flex items-center justify-between bg-white dark:bg-charcoal-950">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <Scissors className="w-10 h-10 text-gold-500" />
          </div>
          <span className="text-2xl font-serif font-bold text-charcoal-900 dark:text-cream-50 tracking-wide">
            LE BARBIER
          </span>
        </Link>
        <div className="px-6 py-2 border border-charcoal-300 dark:border-cream-50 rounded-full">
          <button className="text-sm font-medium text-charcoal-900 dark:text-cream-50">
            Se connecter
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 md:px-12 pt-8 pb-16">
        <div className="w-full max-w-xl bg-white dark:bg-charcoal-800 border-2 border-gold-200 dark:border-gold-600 rounded-3xl px-8 md:px-12 py-10 md:py-12 relative shadow-lg dark:shadow-3xl">
          <div className="absolute top-3 left-3 w-12 h-12 border-l-2 border-t-2 border-gold-300 dark:border-gold-600 rounded-tl-3xl" />
          <div className="absolute bottom-3 right-3 w-12 h-12 border-r-2 border-b-2 border-gold-300 dark:border-gold-600 rounded-br-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-6 bg-charcoal-900 dark:bg-white rounded-full flex items-center justify-center">
              <AlertCircle className="w-9 h-9 text-white dark:text-charcoal-900" />
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal-900 dark:text-cream-50 mb-4 leading-tight">
              Une Erreur Est<br />Survenue
            </h1>

            <p className="text-base text-charcoal-600 dark:text-cream-300 mb-6 leading-relaxed max-w-md">
              Nous rencontrons un problème technique. Veuillez<br />
              réessayer plus tard. Si le problème persiste,<br />
              contactez notre équipe.
            </p>

            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-3xl mb-8">
              <p className="text-sm text-blue-500 dark:text-blue-300 font-medium tracking-wide">
                CODE ERREUR: 500
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <button
                onClick={reset}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-3xl transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5" />
                Réessayer
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-transparent text-charcoal-900 dark:text-cream-50 border border-charcoal-300 dark:border-cream-50 font-semibold rounded-3xl hover:bg-charcoal-900 dark:hover:bg-cream-50 hover:text-white dark:hover:text-charcoal-900 transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                Retour à l&apos;Accueil
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-cream-200 dark:border-charcoal-600 w-full">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-charcoal-500 dark:text-cream-400 hover:text-gold-500 dark:hover:text-gold-400 transition-colors"
              >
                <Bot className="w-4 h-4" />
                Besoin d&apos;aide immédiate ?
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full pb-6 text-center">
        <p className="text-xs text-charcoal-400 dark:text-cream-500">
          © 2024 LE BARBIER. L&apos;élégance à la française.
        </p>
      </footer>
    </div>
  );
}
