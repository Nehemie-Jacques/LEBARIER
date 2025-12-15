import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mode strict React pour détecter les problèmes
  reactStrictMode: true,
  
  // Optimisations
  swcMinify: true,
  compress: true,
  
  // Masquer le header X-Powered-By pour la sécurité
  poweredByHeader: false,
  
  // Configuration des images si vous utilisez des images externes
  images: {
    domains: [], // Ajoutez vos domaines d'images ici
    formats: ['image/avif', 'image/webp'],
  },
  
  // Langue française par défaut
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  }
};

export default nextConfig;