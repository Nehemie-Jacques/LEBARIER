'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';

export default function TestLoginPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-3 rounded-full bg-card border border-border shadow-lg hover:shadow-xl transition-all"
        >
          {theme === 'dark' ? (
            <Sun className="h-6 w-6 text-primary" />
          ) : (
            <Moon className="h-6 w-6 text-primary" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-md">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Test de la page de Connexion
            </h1>
            <p className="text-muted-foreground mb-4">
              Cette page de test vous permet de visualiser la page de connexion en mode light et dark.
              Utilisez le bouton en haut à droite pour basculer entre les thèmes.
            </p>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Voir la vraie page de connexion
              </Link>
              <Link
                href="/"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>

          {/* Color Palette Demo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-foreground mb-4">Couleurs principales</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-background border border-border rounded-lg"></div>
                  <span className="text-sm text-foreground">Background</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-card border border-border rounded-lg"></div>
                  <span className="text-sm text-foreground">Card</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-lg"></div>
                  <span className="text-sm text-foreground">Primary (Gold)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg"></div>
                  <span className="text-sm text-foreground">Muted</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-foreground mb-4">Typographie</h2>
              <div className="space-y-3">
                <p className="text-foreground font-semibold">Texte principal (foreground)</p>
                <p className="text-muted-foreground">Texte secondaire (muted)</p>
                <p className="text-primary font-semibold">Texte accentué (primary)</p>
                <p className="text-sm text-muted-foreground">Petit texte</p>
              </div>
            </div>
          </div>

          {/* Login Preview Embedded */}
          <div className="bg-card border border-border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold text-foreground mb-6">Aperçu de la page de connexion</h2>
            <div className="flex justify-center">
              <iframe
                src="/login"
                className="w-full h-[800px] border border-border rounded-lg"
                title="Login Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
