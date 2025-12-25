'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Scissors, Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Logique d'inscription
    console.log('Inscription...');
  };

  return (
    <div className="min-h-screen flex flex-col bg-charcoal-950">
      {/* Header */}
      <header className="w-full px-6 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <Scissors className="w-6 h-6 text-gold-500" />
          </div>
          <span className="text-xl font-serif font-bold text-cream-50 tracking-wide">
            LE BARBIER
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-cream-200 hover:text-gold-400 transition-colors">
            Accueil
          </Link>
          <Link href="/services" className="text-sm text-cream-200 hover:text-gold-400 transition-colors">
            Services
          </Link>
          <Link href="/booking" className="text-sm text-cream-200 hover:text-gold-400 transition-colors">
            Réserver
          </Link>
          <Link href="/shop" className="text-sm text-cream-200 hover:text-gold-400 transition-colors">
            Boutique
          </Link>
        </nav>

        <Link
          href="/login"
          className="px-6 py-2 border border-gold-500 text-gold-500 rounded-full text-sm font-medium hover:bg-gold-500 hover:text-charcoal-950 transition-all"
        >
          Se connecter
        </Link>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-charcoal-900 rounded-2xl px-8 py-10 shadow-2xl">
          {/* Logo et titre */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 mb-4 flex items-center justify-center">
              <Scissors className="w-10 h-10 text-gold-500" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-cream-50 mb-2">
              Créer un compte
            </h1>
            <p className="text-sm text-cream-400">
              Rejoignez le cercle de l&apos;excellence
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Prénom et Nom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-cream-200 mb-2">
                  Prénom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500" />
                  <input
                    type="text"
                    placeholder="Jean"
                    className="w-full pl-10 pr-4 py-3 bg-charcoal-800 text-cream-50 border border-charcoal-700 rounded-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder:text-cream-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cream-200 mb-2">
                  Nom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500" />
                  <input
                    type="text"
                    placeholder="Dupont"
                    className="w-full pl-10 pr-4 py-3 bg-charcoal-800 text-cream-50 border border-charcoal-700 rounded-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder:text-cream-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-cream-200 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500" />
                <input
                  type="email"
                  placeholder="exemple@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-charcoal-800 text-cream-50 border border-charcoal-700 rounded-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder:text-cream-600"
                  required
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-cream-200 mb-2">
                Téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500" />
                <input
                  type="tel"
                  placeholder="06 12 34 56 78"
                  className="w-full pl-10 pr-4 py-3 bg-charcoal-800 text-cream-50 border border-charcoal-700 rounded-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder:text-cream-600"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-cream-200 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-charcoal-800 text-cream-50 border border-charcoal-700 rounded-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder:text-cream-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-500 hover:text-cream-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-cream-500 mt-1">SÉCURITÉ</p>
            </div>

            {/* Confirmer mot de passe */}
            <div>
              <label className="block text-sm font-medium text-cream-200 mb-2">
                Confirmer mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-charcoal-800 text-cream-50 border border-charcoal-700 rounded-lg focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder:text-cream-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-500 hover:text-cream-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Conditions générales */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-charcoal-700 bg-charcoal-800 text-gold-500 focus:ring-gold-500 focus:ring-offset-charcoal-900"
                required
              />
              <label htmlFor="terms" className="text-sm text-cream-400">
                J&apos;accepte les{' '}
                <Link href="/terms" className="text-gold-500 hover:text-gold-400 underline">
                  Conditions Générales d&apos;Utilisation
                </Link>
              </label>
            </div>

            {/* Bouton S'inscrire */}
            <button
              type="submit"
              className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              S&apos;INSCRIRE
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-charcoal-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-charcoal-900 text-cream-500">OU S&apos;INSCRIRE AVEC</span>
              </div>
            </div>

            {/* Boutons OAuth */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-gray-100 text-charcoal-900 font-medium rounded-lg transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Lien vers connexion */}
            <div className="text-center mt-6">
              <p className="text-sm text-cream-400">
                Déjà un compte ?{' '}
                <Link href="/login" className="text-gold-500 hover:text-gold-400 font-medium">
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center">
        <p className="text-xs text-cream-600">
          © 2024 LE BARBIER. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}
