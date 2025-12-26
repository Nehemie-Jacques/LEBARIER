'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MailCheck, ArrowLeft } from 'lucide-react';

export default function VerifyEmailLightPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    
    // Simulation d'envoi d'email
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsResending(false);
    setResendSuccess(true);
    
    // Réinitialiser le message de succès après 3 secondes
    setTimeout(() => setResendSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      {/* Header */}
      <header className="w-full px-6 md:px-12 py-4 bg-white border-b border-cream-200">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg className="w-6 h-6 text-gold-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.3"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-serif font-bold text-charcoal-950 tracking-wide">
              LE BARBIER
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-charcoal-700 hover:text-gold-500 transition-colors">
              Accueil
            </Link>
            <Link href="/services" className="text-sm text-charcoal-700 hover:text-gold-500 transition-colors">
              Services
            </Link>
            <Link href="/booking" className="text-sm text-charcoal-700 hover:text-gold-500 transition-colors">
              Réserver
            </Link>
            <Link href="/shop" className="text-sm text-charcoal-700 hover:text-gold-500 transition-colors">
              Boutique
            </Link>
          </nav>

          <Link
            href="/login"
            className="px-6 py-2 border border-gold-500 text-gold-500 rounded-full text-sm font-medium hover:bg-gold-500 hover:text-white transition-all"
          >
            Se connecter
          </Link>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl px-8 py-12 shadow-xl border border-cream-200">
          {/* Icône Email */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Cercle de fond avec glow effect */}
              <div className="absolute inset-0 bg-gold-500/10 rounded-full blur-xl"></div>
              <div className="relative w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center border-2 border-gold-400/30">
                <MailCheck className="w-10 h-10 text-gold-600" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Titre */}
          <h1 className="text-3xl font-serif font-bold text-charcoal-950 text-center mb-4">
            Vérifiez votre email
          </h1>

          {/* Description */}
          <p className="text-center text-charcoal-600 text-sm leading-relaxed mb-8">
            Nous avons envoyé un lien de confirmation à votre adresse email. Veuillez consulter votre boîte de réception et cliquer sur le lien pour activer votre compte.
          </p>

          {/* Message de succès */}
          {resendSuccess && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm text-center">
                ✓ Email renvoyé avec succès !
              </p>
            </div>
          )}

          {/* Bouton Renvoyer */}
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className="w-full py-3 bg-gold-500 hover:bg-gold-600 disabled:bg-gold-300 disabled:cursor-not-allowed text-charcoal-950 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl mb-6"
          >
            {isResending ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin"></div>
                Envoi en cours...
              </span>
            ) : (
              "RENVOYER L'EMAIL"
            )}
          </button>

          {/* Lien retour à la connexion */}
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm text-charcoal-500 hover:text-gold-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la connexion
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center bg-white border-t border-cream-200">
        <p className="text-xs text-charcoal-500">
          © 2024 LE BARBIER. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
