'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestVerifyDark() {
  const router = useRouter();

  useEffect(() => {
    // Forcer le mode sombre
    document.documentElement.classList.add('dark');
    
    // Rediriger vers la page verify-email
    setTimeout(() => {
      router.push('/verify-email');
    }, 100);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-950">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-cream-200">Chargement de la page en mode sombre...</p>
      </div>
    </div>
  );
}
