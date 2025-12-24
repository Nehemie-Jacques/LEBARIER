'use client';

import { useState } from 'react';
import Error from '../error';
import { Moon, Sun } from 'lucide-react';

export default function TestErrorDarkPage() {
    const [isDark, setIsDark] = useState(false);
    const [showError, setShowError] = useState(false);

    const mockError = new Error('Ceci est une erreur de test pour visualiser error.tsx');
    const mockReset = () => {
        console.log('Reset appelé');
        setShowError(false);
        setTimeout(() => setShowError(true), 100);
    };

    if (!showError) {
        return (
            <div className="h-screen flex items-center justify-center bg-cream-50 dark:bg-charcoal-950">
                <button
                    onClick={() => setShowError(true)}
                    className="px-8 py-4 bg-red-500 text-white rounded-lg font-semibold"
                >
                    Afficher la page d&apos;erreur
                </button>
            </div>
        );
    }

    return (
        <div className={isDark ? 'dark' : ''}>
            {/* Bouton de toggle fixé en haut à droite */}
            <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="
            flex items-center gap-2
            px-4 py-3
            bg-white dark:bg-charcoal-800
            text-charcoal-900 dark:text-cream-50
            border-2 border-charcoal-900 dark:border-cream-50
            rounded-lg
            shadow-lg
            font-semibold
            transition-all duration-300
            hover:scale-105
          "
                >
                    {isDark ? (
                        <>
                            <Sun className="w-5 h-5" />
                            Mode Clair
                        </>
                    ) : (
                        <>
                            <Moon className="w-5 h-5" />
                            Mode Sombre
                        </>
                    )}
                </button>

                <div className="
          px-4 py-2
          bg-blue-100 dark:bg-blue-900/30
          border border-blue-200 dark:border-blue-700
          rounded-lg
          text-xs text-center
          text-blue-700 dark:text-blue-300
        ">
                    Mode actuel: <br />
                    <strong>{isDark ? 'Dark 🌙' : 'Light ☀️'}</strong>
                </div>
            </div>

            {/* Page d'erreur */}
            <Error error={mockError} reset={mockReset} />
        </div>
    );
}
