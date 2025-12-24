'use client';

import { useState, useEffect } from 'react';
import Loading from './loading';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de 3 secondes
    const timer = setTimeout(() => setIsLoading(false), 35000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-8">
      <h1>Contenu principal</h1>
      <button
        onClick={() => setIsLoading(true)}
        className="mt-4 bg-primary text-white px-4 py-2 rounded"
      >
        Recharger l'animation
      </button>
    </div>
  );
}