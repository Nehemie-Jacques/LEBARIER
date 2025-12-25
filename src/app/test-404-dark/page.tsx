'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Test404Dark() {
    const router = useRouter();

    useEffect(() => {
        // Forcer le mode sombre
        document.documentElement.classList.add('dark');

        // Rediriger vers une page 404
        setTimeout(() => {
            router.push('/page-qui-nexiste-pas-test-dark-mode');
        }, 100);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-charcoal-950">
            <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-cream-200">Redirection vers la page 404 en mode sombre...</p>
            </div>
        </div>
    );
}
