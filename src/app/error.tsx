'use client';

import { useEffect } from 'react';
import { AlertCircle, RotateCcw, Home, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logger l'erreur côté client
    console.error('Erreur capturée:', error);
  }, [error]);

  return (
    <div className="
      min-h-screen
      flex flex-col
      bg-cream-50 dark:bg-charcoal-950
      transition-colors duration-300
    ">
      {/* Header */}
      <header className="
        w-full
        border-b border-cream-200 dark:border-charcoal-800
        bg-white/80 dark:bg-charcoal-900/80
        backdrop-blur-sm
      ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✂</span>
              </div>
              <span className="text-xl font-serif font-bold text-charcoal-900 dark:text-cream-50">
                LE BARBIER
              </span>
            </Link>

            {/* Bouton Se connecter */}
            <button className="
              px-4 py-2
              text-sm font-medium
              text-charcoal-900 dark:text-cream-50
              hover:text-gold-500 dark:hover:text-gold-400
              transition-colors
            ">
              Se connecter
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="
        flex-1
        flex items-center justify-center
        px-4 py-12
      ">
        <div className="
          w-full max-w-2xl
          bg-white dark:bg-charcoal-900
          rounded-2xl
          border-2 border-gold-200 dark:border-gold-800
          shadow-xl dark:shadow-2xl
          p-8 md:p-12
          relative
          overflow-hidden
        ">
          {/* Decorations dorées dans les coins */}
          <div className="
            absolute top-0 left-0
            w-24 h-24
            border-l-2 border-t-2 border-gold-300 dark:border-gold-700
            rounded-tl-2xl
          " />
          <div className="
            absolute bottom-0 right-0
            w-24 h-24
            border-r-2 border-b-2 border-gold-300 dark:border-gold-700
            rounded-br-2xl
          " />

          {/* Contenu */}
          <div className="relative z-10 text-center">
            {/* Icône d'erreur */}
            <div className="
              inline-flex items-center justify-center
              w-16 h-16 md:w-20 md:h-20
              bg-charcoal-900 dark:bg-white
              rounded-full
              mb-6
              animate-pulse
            ">
              <AlertCircle className="
                w-10 h-10 md:w-12 md:h-12
                text-white dark:text-charcoal-900
              " />
            </div>

            {/* Titre */}
            <h1 className="
              text-4xl md:text-5xl
              font-serif font-bold
              text-charcoal-900 dark:text-cream-50
              mb-4
            ">
              Une Erreur Est Survenue
            </h1>

            {/* Description */}
            <p className="
              text-base md:text-lg
              text-charcoal-600 dark:text-cream-300
              mb-2
              max-w-md mx-auto
            ">
              Nous rencontrons un problème technique. Veuillez réessayer plus tard.
              Si le problème persiste, contactez notre équipe.
            </p>

            {/* Code erreur */}
            <div className="
              inline-block
              px-4 py-2
              bg-blue-100 dark:bg-blue-900/30
              border border-blue-200 dark:border-blue-700
              rounded-lg
              mt-4 mb-8
            ">
              <p className="
                text-xs md:text-sm
                text-blue-700 dark:text-blue-300
                font-mono
              ">
                CODE ERREUR: 500
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="
              flex flex-col sm:flex-row
              items-center justify-center
              gap-4
            ">
              {/* Bouton Réessayer */}
              <button
                onClick={reset}
                className="
                  w-full sm:w-auto
                  flex items-center justify-center gap-2
                  px-6 md:px-8 py-3 md:py-4
                  bg-gold-500 hover:bg-gold-600
                  text-white
                  font-semibold
                  rounded-lg
                  shadow-lg hover:shadow-xl
                  transition-all duration-300
                  transform hover:scale-105
                "
              >
                <RotateCcw className="w-5 h-5" />
                Réessayer
              </button>

              {/* Bouton Retour à l'accueil */}
              <Link
                href="/"
                className="
                  w-full sm:w-auto
                  flex items-center justify-center gap-2
                  px-6 md:px-8 py-3 md:py-4
                  bg-white dark:bg-charcoal-800
                  text-charcoal-900 dark:text-cream-50
                  border-2 border-charcoal-900 dark:border-cream-50
                  font-semibold
                  rounded-lg
                  hover:bg-charcoal-900 dark:hover:bg-cream-50
                  hover:text-white dark:hover:text-charcoal-900
                  transition-all duration-300
                  transform hover:scale-105
                "
              >
                <Home className="w-5 h-5" />
                Retour à l&apos;Accueil
              </Link>
            </div>

            {/* Lien d'aide */}
            <div className="mt-8 pt-6 border-t border-cream-200 dark:border-charcoal-700">
              <Link
                href="/contact"
                className="
                  inline-flex items-center gap-2
                  text-sm
                  text-charcoal-500 dark:text-cream-400
                  hover:text-gold-500 dark:hover:text-gold-400
                  transition-colors
                "
              >
                <Headphones className="w-4 h-4" />
                Besoin d&apos;aide immédiate ?
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="
        w-full
        py-6
        text-center
        text-xs
        text-charcoal-400 dark:text-cream-500
      ">
        <p>© 2024 LE BARBIER. L&apos;élégance à la française.</p>
      </footer>
    </div>
  );
}
