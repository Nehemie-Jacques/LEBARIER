"use client";
import { Scissors } from 'lucide-react';

export default function Loading() {
  return (
    <div className="
      fixed inset-0 z-50
      flex flex-col items-center justify-center
      bg-cream-50 dark:bg-charcoal-950
      transition-colors duration-300
    ">
      {/* Logo avec animation */}
      <div className="relative mb-8">
        {/* Cercle de fond avec bordure */}
        <div className="
          w-24 h-24
          rounded-full
          bg-white dark:bg-charcoal-900
          border-2 border-gold-200 dark:border-gold-800
          flex items-center justify-center
          shadow-lg dark:shadow-gold-lg
          animate-pulse
        ">
          {/* Icône de ciseaux */}
          <Scissors className="
            w-12 h-12
            text-gold-500
            animate-[spin_3s_ease-in-out_infinite]
          " />
        </div>

        {/* Cercle d'animation externe */}
        <div className="
          absolute inset-0
          rounded-full
          border-4 border-transparent
          border-t-gold-500
          animate-spin
        " />
      </div>

      {/* Nom de l'application */}
      <h1 className="
        text-3xl font-serif font-bold
        text-charcoal-900 dark:text-cream-50
        mb-6
        tracking-wider
      ">
        LE BARBIER
      </h1>

      {/* Barre de progression */}
      <div className="
        w-48 h-1
        bg-cream-200 dark:bg-charcoal-800
        rounded-full
        overflow-hidden
        relative
      ">
        <div className="
          absolute inset-y-0 left-0
          w-1/2
          bg-gradient-to-r from-gold-400 to-gold-600
          animate-[loading_1.5s_ease-in-out_infinite]
        " />
      </div>

      {/* Texte de chargement */}
      <p className="
        mt-6
        text-sm font-medium
        text-charcoal-600 dark:text-cream-300
        animate-pulse
      ">
        Chargement en cours...
      </p>

      {/* Copyright */}
      <p className="
        absolute bottom-8
        text-xs
        text-charcoal-400 dark:text-cream-500
      ">
        © 2024 LE BARBIER. v1.0
      </p>

      {/* Animation CSS personnalisée */}
      <style jsx>{`
        @keyframes loading {
          0% {
            left: -50%;
          }
          50% {
            left: 50%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
