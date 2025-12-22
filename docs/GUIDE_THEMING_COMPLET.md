# 🎨 Guide Complet du Système de Thème — LE BARBIER

> Guide pratique pour comprendre et utiliser le système de thème (mode clair/sombre) dans votre projet.

---

## 📚 Table des matières

1. [Vue d'ensemble](#-vue-densemble)
2. [Installation](#-installation)
3. [Architecture](#-architecture)
4. [Exemples pratiques](#-exemples-pratiques)
5. [Variables CSS disponibles](#-variables-css-disponibles)
6. [Bonnes pratiques](#-bonnes-pratiques)
7. [Dépannage](#-dépannage)

---

## 📖 Vue d'ensemble

Le système de thème de LE BARBIER permet de basculer automatiquement entre un mode clair et un mode sombre. Il utilise :

- **CSS Variables** pour toutes les couleurs et dimensions
- **Tailwind CSS** pour les classes utilitaires
- **next-themes** pour la gestion du thème côté client
- **lucide-react** pour les icônes

### Fichiers principaux

```
📁 Projet
├── src/
│   ├── styles/
│   │   └── globals.css           ← Variables CSS (couleurs, tailles)
│   ├── app/
│   │   └── layout.tsx             ← Intégration ThemeProvider
│   └── components/
│       └── providers/
│           └── ThemeProvider.tsx  ← Wrapper next-themes
├── components/
│   └── common/
│       └── ThemeToggle.tsx        ← Bouton de changement de thème
└── tailwind.config.ts             ← Configuration Tailwind
```

---

## 🚀 Installation

### Dépendances requises

Les dépendances suivantes ont déjà été installées :

```bash
✅ next-themes      # Gestion du thème
✅ lucide-react     # Icônes
```

Si vous avez besoin de les réinstaller :

```bash
npm install next-themes lucide-react
```

---

## 🏗️ Architecture

### Comment ça fonctionne

```
1. L'utilisateur clique sur le bouton ThemeToggle
   ↓
2. next-themes ajoute/retire la classe .dark sur <html>
   ↓
3. Les variables CSS changent automatiquement
   ↓
4. Tous les composants s'adaptent instantanément
```

### Schéma des variables

```css
/* Mode Clair */
:root {
  --background: blanc
  --foreground: noir
  --primary: or (#C9A961)
}

/* Mode Sombre */
html.dark {
  --background: noir charbon
  --foreground: blanc
  --primary: or (#C9A961)  /* reste identique */
}
```

---

## 💡 Exemples pratiques

### Exemple 1 : Card de service simple

```tsx
// components/services/ServiceCard.tsx
export function ServiceCard({ title, price, description }: Props) {
  return (
    <div className="
      bg-card                 /* Fond adaptatif */
      text-card-foreground    /* Texte adaptatif */
      border border-border    /* Bordure adaptative */
      rounded-lg p-6 
      shadow-lg hover:shadow-gold-lg
      transition-all duration-300
    ">
      <h3 className="text-2xl font-serif text-primary mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-foreground">
          {price} FCFA
        </span>
        <button className="
          bg-primary text-primary-foreground
          hover:bg-primary/90
          px-6 py-3 rounded-md
          font-medium transition-colors
        ">
          Réserver
        </button>
      </div>
    </div>
  );
}
```

**Résultat :**
- En mode clair : fond blanc, texte noir
- En mode sombre : fond gris foncé, texte blanc
- La couleur or (primary) reste identique dans les deux modes

---

### Exemple 2 : Hero Section avec gradient

```tsx
// components/home/HeroSection.tsx
export function HeroSection() {
  return (
    <section className="
      relative py-24 overflow-hidden
      bg-gradient-to-br from-cream-100 to-cream-200
      dark:from-charcoal-900 dark:to-charcoal-800
    ">
      {/* Overlay doré */}
      <div className="absolute inset-0 bg-gold-500/10 dark:bg-gold-500/5" />
      
      <div className="container mx-auto relative z-10">
        <h1 className="
          text-6xl md:text-7xl lg:text-hero
          font-serif font-bold
          text-charcoal-900 dark:text-cream-50
          mb-6
        ">
          LE BARBIER
        </h1>
        
        <p className="
          text-xl md:text-2xl
          text-charcoal-700 dark:text-cream-200
          max-w-2xl mb-8
        ">
          L'art de la beauté redéfini avec élégance et savoir-faire
        </p>
        
        <button className="
          bg-primary text-primary-foreground
          hover:bg-primary/90
          px-8 py-4 rounded-lg
          text-lg font-semibold
          shadow-gold-lg hover:shadow-gold-xl
          transition-all duration-300
        ">
          Prendre rendez-vous
        </button>
      </div>
    </section>
  );
}
```

---

### Exemple 3 : Formulaire adaptatif

```tsx
// components/booking/BookingForm.tsx
export function BookingForm() {
  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Nom complet
        </label>
        <input
          type="text"
          className="
            w-full px-4 py-3 rounded-lg
            bg-input text-foreground
            border border-border
            focus:ring-2 focus:ring-primary focus:border-transparent
            transition-all
          "
          placeholder="Jean Dupont"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Service désiré
        </label>
        <select className="
          w-full px-4 py-3 rounded-lg
          bg-input text-foreground
          border border-border
          focus:ring-2 focus:ring-primary focus:border-transparent
        ">
          <option>Coupe Classique</option>
          <option>Coupe + Barbe</option>
          <option>Soin Complet</option>
        </select>
      </div>
      
      <button type="submit" className="
        w-full bg-primary text-primary-foreground
        hover:bg-primary/90
        px-6 py-4 rounded-lg
        font-semibold text-lg
        transition-colors
      ">
        Confirmer la réservation
      </button>
    </form>
  );
}
```

---

### Exemple 4 : Intégrer le bouton de thème dans le Header

```tsx
// components/layout/Header.tsx
import Link from 'next/link';
import ThemeToggle from '@/components/common/ThemeToggle';

export default function Header() {
  return (
    <header className="
      sticky top-0 z-50
      bg-card/95 backdrop-blur-sm
      border-b border-border
      shadow-sm
    ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-primary">
              LE BARBIER
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="
              text-foreground hover:text-primary
              font-medium transition-colors
            ">
              Services
            </Link>
            <Link href="/booking" className="
              text-foreground hover:text-primary
              font-medium transition-colors
            ">
              Réserver
            </Link>
            <Link href="/shop" className="
              text-foreground hover:text-primary
              font-medium transition-colors
            ">
              Boutique
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Bouton de thème */}
            <ThemeToggle />
            
            <button className="
              bg-primary text-primary-foreground
              hover:bg-primary/90
              px-6 py-2 rounded-md
              font-medium transition-colors
            ">
              Connexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

### Exemple 5 : Lire le thème dans un composant client

```tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function WelcomeMessage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-20" />; // Placeholder
  }

  return (
    <div className="text-center py-8">
      <p className="text-2xl text-foreground">
        Bienvenue ! Vous utilisez le mode {' '}
        <span className="font-bold text-primary">
          {theme === 'dark' ? 'sombre 🌙' : 'clair ☀️'}
        </span>
      </p>
    </div>
  );
}
```

---

## 🎨 Variables CSS disponibles

### Couleurs système (adaptatives)

| Variable | Classe Tailwind | Usage | Mode clair | Mode sombre |
|----------|----------------|-------|------------|-------------|
| `--background` | `bg-background` | Fond principal | Blanc | Noir charbon |
| `--foreground` | `text-foreground` | Texte principal | Noir | Blanc |
| `--card` | `bg-card` | Fond de carte | Blanc | Gris foncé |
| `--card-foreground` | `text-card-foreground` | Texte carte | Noir | Blanc |
| `--primary` | `bg-primary` | Couleur marque (or) | #C9A961 | #C9A961 |
| `--primary-foreground` | `text-primary-foreground` | Texte sur primary | Blanc | Noir |
| `--muted` | `bg-muted` | Fond atténué | Gris très clair | Gris moyen |
| `--muted-foreground` | `text-muted-foreground` | Texte secondaire | Gris | Gris clair |
| `--border` | `border-border` | Bordures | Gris clair | Gris moyen |
| `--input` | `bg-input` | Champs de saisie | Gris très clair | Gris foncé |

### Couleurs de marque (fixes)

| Palette | Nuances | Usage |
|---------|---------|-------|
| **Gold** | `gold-50` à `gold-900` | Accents premium, boutons principaux |
| **Cream** | `cream-50` à `cream-900` | Fonds élégants, sections claires |
| **Charcoal** | `charcoal-50` à `charcoal-900` | Textes foncés, fonds mode sombre |

### Autres tokens

| Token | Valeur | Usage |
|-------|--------|-------|
| `--radius` | `0.5rem` | Arrondi par défaut |
| `--container-max-width` | `1200px` | Largeur max conteneur |
| `--shadow-subtle` | voir globals.css | Ombre légère |

---

## ✅ Bonnes pratiques

### ✅ À FAIRE

#### 1. Toujours utiliser les variables CSS

```tsx
// ✅ BON
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">

// ✅ BON AUSSI (avec dark:)
<div className="bg-white dark:bg-charcoal-800">
```

#### 2. Prévoir les deux modes dès le départ

```tsx
// ✅ BON - Pensé pour les deux modes
<div className="
  bg-cream-100 dark:bg-charcoal-900
  text-charcoal-900 dark:text-cream-100
  border border-cream-300 dark:border-charcoal-700
">
```

#### 3. Utiliser les ombres adaptatives

```tsx
// ✅ BON
<div className="shadow-lg dark:shadow-gold-lg">
<div className="hover:shadow-gold dark:hover:shadow-gold-lg">
```

#### 4. Tester visuellement les deux modes

```tsx
// Dans votre composant, ajoutez temporairement le ThemeToggle
import ThemeToggle from '@/components/common/ThemeToggle';

export function MonComposant() {
  return (
    <div>
      {/* Temporaire pour tester */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Votre contenu */}
    </div>
  );
}
```

---

### ❌ À ÉVITER

#### 1. Ne pas hardcoder les couleurs

```tsx
// ❌ MAUVAIS
<div className="bg-white text-black">
<div style={{ backgroundColor: '#FFFFFF' }}>
<div className="bg-[#C9A961]">

// ✅ BON
<div className="bg-background text-foreground">
<div className="bg-primary">
```

#### 2. Ne pas oublier les états hover/focus

```tsx
// ❌ MAUVAIS - Pas adaptatif au survol
<button className="bg-blue-500 hover:bg-blue-600">

// ✅ BON
<button className="
  bg-primary hover:bg-primary/90
  dark:bg-primary dark:hover:bg-primary/80
">
```

#### 3. Ne pas lire useTheme() sans vérifier mounted

```tsx
// ❌ MAUVAIS - Erreur d'hydratation
'use client';
export function BadComponent() {
  const { theme } = useTheme();
  return <div>{theme}</div>; // ❌ Hydration error!
}

// ✅ BON
'use client';
export function GoodComponent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  
  return <div>{theme}</div>; // ✅ OK!
}
```

---

## 🔧 Dépannage

### Problème : Les couleurs ne changent pas en mode sombre

**Cause possible :** La classe `.dark` n'est pas appliquée sur `<html>`

**Solution :**
1. Vérifiez que `ThemeProvider` enveloppe votre app dans `src/app/layout.tsx`
2. Inspectez `<html>` dans DevTools : doit avoir `class="dark"` en mode sombre
3. Vérifiez que vous utilisez les classes Tailwind basées sur variables (`bg-background`, etc.)

```tsx
// src/app/layout.tsx
import ThemeProvider from '@/components/providers/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>  {/* ← Doit envelopper tout */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

### Problème : Flash blanc au chargement

**Cause possible :** Le thème n'est pas détecté assez tôt

**Solution :** Ajoutez `suppressHydrationWarning` sur `<html>`

```tsx
<html lang="fr" suppressHydrationWarning>
```

(Déjà fait dans le projet)

---

### Problème : Les variables CSS ne fonctionnent pas

**Cause possible :** `globals.css` n'est pas importé

**Solution :** Vérifiez l'import dans votre layout

```tsx
// src/app/layout.tsx
import '@/styles/globals.css';  // ← Doit être présent
```

---

### Problème : Le bouton ThemeToggle ne fait rien

**Cause possible :** Erreur d'import ou composant mal placé

**Solution :**
```tsx
// Vérifiez le chemin d'import
import ThemeToggle from '@/components/common/ThemeToggle';

// Le composant doit être dans un Client Component ou une zone cliente
```

---

## 🎓 Conseils d'expert

### 1. Créez des composants réutilisables

```tsx
// components/ui/Section.tsx
export function Section({ 
  children, 
  variant = 'default' 
}: { 
  children: React.ReactNode; 
  variant?: 'default' | 'accent' 
}) {
  return (
    <section className={`
      py-16
      ${variant === 'default' 
        ? 'bg-background' 
        : 'bg-cream-100 dark:bg-charcoal-800'
      }
    `}>
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
}
```

### 2. Documentez vos composants

```tsx
/**
 * Card de service avec support du mode sombre
 * 
 * @param title - Titre du service
 * @param price - Prix en FCFA
 * @param description - Description courte
 * 
 * @example
 * <ServiceCard 
 *   title="Coupe Classique"
 *   price={5000}
 *   description="Coupe professionnelle"
 * />
 */
export function ServiceCard({ title, price, description }) {
  // ...
}
```

### 3. Utilisez des constantes pour les couleurs personnalisées

```tsx
// lib/constants.ts
export const COLORS = {
  brand: {
    gold: '#C9A961',
    cream: '#FBF7F0',
    charcoal: '#2A2A2A',
  },
} as const;

// Mais préférez toujours les classes Tailwind !
// Ces constantes sont utiles pour des cas spéciaux (canvas, charts, etc.)
```

---

## 📚 Ressources

- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [next-themes sur GitHub](https://github.com/pacocoursey/next-themes)
- [Lucide Icons](https://lucide.dev/)
- [Next.js App Router](https://nextjs.org/docs/app)

---

## 🚀 Pour aller plus loin

### Ajouter des animations de transition

```tsx
// Dans globals.css, ajoutez :
@layer base {
  * {
    @apply transition-colors duration-200;
  }
}
```

### Créer une page de style guide

```tsx
// src/app/style-guide/page.tsx
export default function StyleGuidePage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-serif text-primary mb-8">
        Guide de styles
      </h1>
      
      {/* Couleurs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Couleurs</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="h-24 bg-primary rounded-lg" />
          <div className="h-24 bg-secondary rounded-lg" />
          <div className="h-24 bg-accent rounded-lg" />
          <div className="h-24 bg-muted rounded-lg" />
        </div>
      </section>
      
      {/* Boutons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Boutons</h2>
        <div className="flex gap-4">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md">
            Primaire
          </button>
          <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md">
            Secondaire
          </button>
        </div>
      </section>
    </div>
  );
}
```

---

**✨ Félicitations !** Vous maîtrisez maintenant le système de thème de LE BARBIER. N'hésitez pas à expérimenter et à créer vos propres composants adaptatifs ! 🎉
