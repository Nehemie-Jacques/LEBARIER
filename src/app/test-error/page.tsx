'use client';

import { useState } from 'react';

export default function TestErrorPage() {
    const [shouldThrow, setShouldThrow] = useState(false);

    // Déclencher une erreur au prochain render
    if (shouldThrow) {
        throw new Error('Ceci est une erreur de test pour visualiser la page error.tsx !');
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-background">
            <div className="text-center max-w-md">
                <h1 className="text-3xl font-bold text-foreground mb-4">
                    Test de la Page d&apos;Erreur
                </h1>
                <p className="text-muted-foreground mb-8">
                    Cliquez sur le bouton ci-dessous pour déclencher une erreur et voir la page error.tsx en action.
                </p>
                <button
                    onClick={() => setShouldThrow(true)}
                    className="
            px-8 py-4
            bg-red-500 hover:bg-red-600
            text-white
            font-semibold
            rounded-lg
            shadow-lg hover:shadow-xl
            transition-all duration-300
            transform hover:scale-105
          "
                >
                    🔥 Déclencher une Erreur
                </button>

                <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg border border-yellow-300 dark:border-yellow-700">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        💡 Astuce : Testez aussi en mode sombre avec le bouton de thème dans le header !
                    </p>
                </div>
            </div>
        </div>
    );
}
