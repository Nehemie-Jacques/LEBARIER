'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TestThemePage() {
    const { theme, setTheme, systemTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream-50 dark:bg-charcoal-950">
                <div className="text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-charcoal-600 dark:text-cream-200">Chargement...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-cream-50 dark:bg-charcoal-950 transition-colors">
            <div className="max-w-2xl w-full bg-white dark:bg-charcoal-900 rounded-2xl shadow-xl p-8 border border-cream-200 dark:border-charcoal-800">
                <h1 className="text-3xl font-bold text-charcoal-950 dark:text-cream-50 mb-6">
                    Test du Thème Automatique
                </h1>

                <div className="space-y-4 mb-8">
                    <div className="p-4 bg-cream-100 dark:bg-charcoal-800 rounded-lg">
                        <p className="text-sm text-charcoal-600 dark:text-cream-400 mb-1">Thème actuel :</p>
                        <p className="text-lg font-semibold text-charcoal-950 dark:text-cream-50">
                            {theme || 'Non défini'}
                        </p>
                    </div>

                    <div className="p-4 bg-cream-100 dark:bg-charcoal-800 rounded-lg">
                        <p className="text-sm text-charcoal-600 dark:text-cream-400 mb-1">Thème système :</p>
                        <p className="text-lg font-semibold text-charcoal-950 dark:text-cream-50">
                            {systemTheme || 'Non détecté'}
                        </p>
                    </div>

                    <div className="p-4 bg-cream-100 dark:bg-charcoal-800 rounded-lg">
                        <p className="text-sm text-charcoal-600 dark:text-cream-400 mb-1">Thème résolu :</p>
                        <p className="text-lg font-semibold text-charcoal-950 dark:text-cream-50">
                            {resolvedTheme || 'Non résolu'}
                        </p>
                    </div>

                    <div className="p-4 bg-cream-100 dark:bg-charcoal-800 rounded-lg">
                        <p className="text-sm text-charcoal-600 dark:text-cream-400 mb-1">Classe HTML :</p>
                        <p className="text-lg font-semibold text-charcoal-950 dark:text-cream-50">
                            {document.documentElement.classList.contains('dark') ? 'dark ✅' : 'light ✅'}
                        </p>
                    </div>
                </div>

                <div className="space-y-3 mb-8">
                    <p className="text-sm font-semibold text-charcoal-700 dark:text-cream-300 mb-2">
                        Changer le thème manuellement :
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => setTheme('light')}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${theme === 'light'
                                    ? 'bg-gold-500 text-charcoal-950 shadow-lg'
                                    : 'bg-cream-200 dark:bg-charcoal-700 text-charcoal-700 dark:text-cream-200 hover:bg-cream-300 dark:hover:bg-charcoal-600'
                                }`}
                        >
                            ☀️ Light
                        </button>

                        <button
                            onClick={() => setTheme('dark')}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${theme === 'dark'
                                    ? 'bg-gold-500 text-charcoal-950 shadow-lg'
                                    : 'bg-cream-200 dark:bg-charcoal-700 text-charcoal-700 dark:text-cream-200 hover:bg-cream-300 dark:hover:bg-charcoal-600'
                                }`}
                        >
                            🌙 Dark
                        </button>

                        <button
                            onClick={() => setTheme('system')}
                            className={`px-4 py-3 rounded-lg font-medium transition-all ${theme === 'system'
                                    ? 'bg-gold-500 text-charcoal-950 shadow-lg'
                                    : 'bg-cream-200 dark:bg-charcoal-700 text-charcoal-700 dark:text-cream-200 hover:bg-cream-300 dark:hover:bg-charcoal-600'
                                }`}
                        >
                            💻 System
                        </button>
                    </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-6">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                        📋 Instructions :
                    </h3>
                    <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                        <li>• Le thème est défini sur <strong>system</strong> par défaut</li>
                        <li>• Il détecte automatiquement le thème de votre appareil</li>
                        <li>• Changez le thème de votre OS pour voir le changement automatique</li>
                        <li>• Les classes Tailwind <code className="px-1 bg-blue-100 dark:bg-blue-950 rounded">dark:</code> s&apos;appliquent automatiquement</li>
                    </ul>
                </div>

                <div className="flex gap-4">
                    <Link
                        href="/"
                        className="flex-1 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-charcoal-950 font-semibold rounded-lg transition-all text-center"
                    >
                        Retour à l&apos;accueil
                    </Link>
                    <Link
                        href="/not-found-test"
                        className="flex-1 px-6 py-3 bg-charcoal-900 dark:bg-cream-100 hover:bg-charcoal-800 dark:hover:bg-cream-200 text-cream-50 dark:text-charcoal-950 font-semibold rounded-lg transition-all text-center"
                    >
                        Tester 404
                    </Link>
                </div>
            </div>

            {/* Démo visuelle */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
                <div className="p-6 bg-white dark:bg-charcoal-900 rounded-xl border border-cream-200 dark:border-charcoal-800">
                    <h3 className="text-lg font-bold text-charcoal-950 dark:text-cream-50 mb-2">
                        Carte exemple
                    </h3>
                    <p className="text-charcoal-600 dark:text-cream-400 text-sm">
                        Cette carte change automatiquement de couleur selon le thème.
                    </p>
                </div>

                <div className="p-6 bg-gold-100 dark:bg-gold-900/20 rounded-xl border border-gold-200 dark:border-gold-800">
                    <h3 className="text-lg font-bold text-gold-900 dark:text-gold-300 mb-2">
                        Carte accentuée
                    </h3>
                    <p className="text-gold-700 dark:text-gold-400 text-sm">
                        Les couleurs s&apos;adaptent parfaitement au thème sombre ou clair.
                    </p>
                </div>
            </div>
        </div>
    );
}
