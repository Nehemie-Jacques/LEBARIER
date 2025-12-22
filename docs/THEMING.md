# 🎨 Guide Complet du Theming — LE BARBIER

Ce document explique comment fonctionne le système de thème (mode clair/sombre) et comment utiliser les variables de design dans votre projet.

---

## 📋 Ce qui a été mis en place

### Fichiers créés/modifiés

1. **`src/styles/globals.css`**  
   Contient toutes les variables CSS (couleurs, espacements, bordures) pour les modes clair et sombre.

2. **`components/providers/ThemeProvider.tsx`**  
   Composant qui enveloppe l'application et gère le changement de thème automatiquement.

3. **`components/common/ThemeToggle.tsx`**  
   Bouton pour basculer entre mode clair et mode sombre.

4. **`src/app/layout.tsx`**  
   Modifié pour intégrer le `ThemeProvider` et activer le système de thème.

### Dépendances installées

```bash
✅ next-themes  (gestion du thème)
✅ lucide-react (icônes pour le bouton de thème)
```

---

## 🎯 Comment ça fonctionne

### Principe de base

- Toutes les couleurs sont définies en **variables CSS** dans `src/styles/globals.css`
- Le mode clair utilise les variables sous `:root`
- Le mode sombre utilise les variables sous `.dark`
- La bibliothèque `next-themes` ajoute/retire automatiquement la classe `.dark` sur `<html>` quand vous changez de thème

### Variables disponibles

| Variable CSS | Mode Clair | Mode Sombre | Usage |
|--------------|------------|-------------|-------|
| `--background` | Blanc | Noir charbon | Fond principal de page |
| `--foreground` | Noir | Blanc | Texte principal |
| `--primary` | Or (#C9A961) | Or (#C9A961) | Couleur de marque (boutons, liens) |
| `--card` | Blanc | Gris foncé | Fond des cartes |
| `--border` | Gris clair | Gris moyen | Bordures |
| `--input` | Gris très clair | Gris foncé | Champs de saisie |
| `--muted` | Gris clair | Gris moyen | Texte secondaire |

---

## 💡 Exemples d'utilisation

### Exemple 1 : Utiliser les couleurs de base

```tsx
// ✅ BON - Utilise les variables CSS
export function ServiceCard() {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
      <h3 className="text-primary font-bold text-xl">Coupe Classique</h3>
      <p className="text-muted-foreground">Service de qualité premium</p>
      <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
        Réserver
      </button>
    </div>
  );
}
```

```tsx
// ❌ MAUVAIS - Couleurs en dur
export function ServiceCard() {
  return (
    <div className="bg-white text-black border-gray-200">
      <h3 className="text-[#C9A961]">Coupe Classique</h3>
      {/* Ce composant ne s'adaptera PAS au mode sombre ! */}
    </div>
  );
}
```

### Exemple 2 : Utiliser le mode sombre conditionnel

```tsx
export function HeroSection() {
  return (
    <section className="
      bg-cream-100 dark:bg-charcoal-900
      text-charcoal-900 dark:text-cream-100
      py-20
    ">
      <h1 className="text-5xl font-serif text-primary">
        LE BARBIER
      </h1>
      <p className="text-lg text-muted-foreground">
        L'art de la beauté redéfini
      </p>
    </section>
  );
}
```

### Exemple 3 : Ajouter le bouton de changement de thème

Dans votre en-tête (`components/layout/Header.tsx`) :

```tsx
import ThemeToggle from '@/components/common/ThemeToggle';

export default function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4">
        <h1 className="text-2xl font-serif text-primary">LE BARBIER</h1>
        
        <nav className="flex items-center gap-6">
          <a href="/services" className="text-foreground hover:text-primary">Services</a>
          <a href="/booking" className="text-foreground hover:text-primary">Réserver</a>
          <a href="/shop" className="text-foreground hover:text-primary">Boutique</a>
          
          {/* Bouton de changement de thème */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
```

### Exemple 4 : Lire le thème actuel dans un composant

```tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeAwareComponent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <p>Thème actuel : {theme === 'dark' ? '🌙 Sombre' : '☀️ Clair'}</p>
    </div>
  );
}
```

### Exemple 5 : Utiliser les couleurs personnalisées (gold, cream, charcoal)

```tsx
export function PremiumCard() {
  return (
    <div className="
      bg-gradient-to-br from-gold-400 to-gold-600
      dark:from-gold-600 dark:to-gold-800
      text-white
      rounded-lg shadow-gold-lg
      p-8
    ">
      <h2 className="text-3xl font-serif">Service Premium</h2>
      <p className="mt-2 text-cream-100">
        Une expérience de coiffure exceptionnelle
      </p>
      <button className="
        mt-6 bg-cream-100 text-charcoal-900 
        hover:bg-cream-200
        px-6 py-3 rounded-md font-medium
        transition-colors
      ">
        Découvrir
      </button>
    </div>
  );
}
```

---

## ✅ Bonnes pratiques

### 1. Toujours utiliser les variables CSS ou Tailwind

```tsx
// ✅ BON
<div className="bg-background text-foreground">

// ✅ BON AUSSI
<div className="bg-card text-card-foreground">

// ✅ BON ÉGALEMENT
<div className="bg-gold-500 dark:bg-gold-700">

// ❌ ÉVITER
<div className="bg-white text-black">
<div style={{ backgroundColor: '#FFFFFF' }}>
```

### 2. Utiliser `dark:` pour les variations spécifiques

```tsx
// Texte qui change de couleur selon le mode
<p className="text-gray-900 dark:text-gray-100">

// Image différente selon le mode
<img 
  src={theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'} 
  alt="Logo"
/>

// Ombre différente selon le mode
<div className="shadow-lg dark:shadow-gold-lg">
```

### 3. Éviter le "flash" lors du chargement

Le composant `ThemeProvider` est déjà configuré avec `disableTransitionOnChange` pour éviter les animations brusques lors du changement de thème.

Pour les composants qui lisent le thème, utilisez toujours le pattern "mounted" :

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <LoadingSkeleton />;
```

### 4. Tester les deux modes systématiquement

Testez toujours vos composants dans les deux modes :

```tsx
// Dans le navigateur (DevTools Console)
document.documentElement.classList.toggle('dark');
```

Ou utilisez simplement le bouton `ThemeToggle` dans votre interface.

---

## 🎨 Palette de couleurs complète

### Couleurs système (adaptatives)

| Classe Tailwind | Variable CSS | Description |
|----------------|--------------|-------------|
| `bg-background` | `--background` | Fond principal |
| `bg-foreground` | `--foreground` | Texte principal |
| `bg-card` | `--card` | Fond de carte |
| `bg-primary` | `--primary` | Couleur de marque (or) |
| `bg-secondary` | `--secondary` | Couleur secondaire |
| `bg-muted` | `--muted` | Fond atténué |
| `bg-accent` | `--accent` | Accent |
| `bg-destructive` | `--destructive` | Danger/Erreur |
| `border-border` | `--border` | Bordures |
| `bg-input` | `--input` | Champs de formulaire |

### Couleurs de marque (fixes)

| Couleur | Variantes | Usage |
|---------|-----------|-------|
| **Gold** | `gold-50` à `gold-900` | Boutons premium, accents dorés |
| **Cream** | `cream-50` à `cream-900` | Fonds clairs, sections élégantes |
| **Charcoal** | `charcoal-50` à `charcoal-900` | Textes sombres, fonds mode sombre |

### Ombres spéciales

```tsx
// Ombres dorées (effet premium)
className="shadow-gold"      // Ombre dorée légère
className="shadow-gold-lg"   // Ombre dorée moyenne
className="shadow-gold-xl"   // Ombre dorée forte

// Ombres sombres
className="shadow-dark"
className="shadow-dark-lg"
```

---

## 🔧 Dépannage

### Problème : Les couleurs ne changent pas en mode sombre

**Solution :** Vérifiez que :
1. Le `ThemeProvider` enveloppe bien votre application dans `src/app/layout.tsx`
2. Vous utilisez les classes Tailwind basées sur les variables CSS (`bg-background`, `text-foreground`, etc.)
3. La classe `.dark` est bien présente sur `<html>` (inspectez dans DevTools)

### Problème : Flash de contenu lors du chargement

**Solution :** Ajoutez `suppressHydrationWarning` sur `<html>` :

```tsx
<html lang="fr" suppressHydrationWarning>
```

(Déjà fait dans `src/app/layout.tsx`)

### Problème : Les variables CSS ne fonctionnent pas

**Solution :** Vérifiez que `src/styles/globals.css` est bien importé dans votre layout :

```tsx
import '@/styles/globals.css';
```

(Déjà fait dans `src/app/layout.tsx`)

---

## 📚 Ressources supplémentaires

- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation next-themes](https://github.com/pacocoursey/next-themes)
- [Lucide Icons](https://lucide.dev/)

---

## 🚀 Prochaines étapes

1. **Personnaliser les couleurs** : Modifiez les valeurs HSL dans `src/styles/globals.css` selon votre charte graphique
2. **Ajouter plus de variables** : Espacements personnalisés, tailles de police, etc.
3. **Créer des composants réutilisables** : Boutons, cartes, formulaires qui utilisent automatiquement le bon thème
4. **Tester l'accessibilité** : Vérifiez les contrastes de couleurs dans les deux modes

---

**💡 Conseil final** : Gardez toujours une cohérence dans l'utilisation des variables. Si vous créez un nouveau composant, utilisez TOUJOURS les variables CSS au lieu de couleurs en dur. Votre futur vous remerciera ! 😊
