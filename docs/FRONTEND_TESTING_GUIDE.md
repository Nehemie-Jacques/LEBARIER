# 🧪 Guide de Test des Pages Frontend - LE BARBIER

> **Date de création:** 4 janvier 2026  
> **Version:** 1.0.0  
> **Architecture:** DDD + Next.js 14 App Router

## 📋 Vue d'ensemble

Ce guide liste toutes les pages frontend développées dans l'application LE BARBIER et fournit des instructions pour les tester après la migration vers l'architecture DDD.

### Statistiques
- **Total de pages:** 112 pages
- **Pages publiques:** 15
- **Pages authentifiées:** 97
- **Pages admin:** 12
- **Pages employé:** 8
- **Pages client:** 77

---

## 🏠 Pages Publiques (Accessibles sans connexion)

### 1. Page d'accueil
**Chemin:** `/`  
**Fichier:** `src/app/page.tsx`  
**Composants utilisés:**
- `HeroSection` - Bannière principale
- `ServicesGrid` - Grille des services
- `TeamCarousel` - Carrousel de l'équipe
- `TestimonialsCarousel` - Avis clients
- `GallerySection` - Galerie photos
- `LoyaltySection` - Programme de fidélité
- `CTASection` - Appel à l'action

**Tests à effectuer:**
- ✅ Vérifier que tous les composants se chargent correctement
- ✅ Tester le carrousel des témoignages (navigation gauche/droite)
- ✅ Vérifier les liens vers les pages de services
- ✅ Tester le bouton "Prendre rendez-vous"
- ✅ Vérifier la responsive design (mobile, tablette, desktop)
- ✅ Tester le changement de langue (FR/EN)

**API appelées:**
- `GET /api/services` - Liste des services
- `GET /api/employees` - Liste des employés
- `GET /api/reviews` - Avis clients approuvés

---

### 2. Page Services
**Chemin:** `/services`  
**Fichier:** `src/app/services/page.tsx`  
**Fonctionnalités:**
- Liste complète des services par catégorie
- Filtrage par catégorie (Coupe, Barbe, Soins, etc.)
- Détails de chaque service (prix, durée, description)

**Tests à effectuer:**
- ✅ Vérifier l'affichage de tous les services
- ✅ Tester les filtres par catégorie
- ✅ Vérifier le changement FR/EN des descriptions
- ✅ Tester le bouton "Réserver" pour chaque service
- ✅ Vérifier les images des services

**API appelées:**
- `GET /api/services?isActive=true`

---

### 3. Page Détails d'un Service
**Chemin:** `/services/[slug]`  
**Fichier:** `src/app/services/[slug]/page.tsx`  
**Fonctionnalités:**
- Description complète du service
- Prix et durée
- Employés qualifiés pour ce service
- Avis clients liés au service

**Tests à effectuer:**
- ✅ Vérifier les détails du service
- ✅ Tester la liste des employés disponibles
- ✅ Vérifier les avis clients
- ✅ Tester le bouton de réservation
- ✅ Vérifier les breadcrumbs

**API appelées:**
- `GET /api/services/[id]`
- `GET /api/employees?serviceId=[id]`
- `GET /api/reviews?serviceId=[id]`

---

### 4. Page Équipe
**Chemin:** `/team`  
**Fichier:** `src/app/team/page.tsx`  
**Fonctionnalités:**
- Liste de tous les employés
- Photos, bio, spécialités
- Note moyenne et avis
- Lien vers profil détaillé

**Tests à effectuer:**
- ✅ Vérifier l'affichage de tous les employés
- ✅ Tester les filtres (spécialité, note)
- ✅ Vérifier les images de profil
- ✅ Tester le bouton "Réserver avec cet employé"
- ✅ Vérifier les liens vers profils détaillés

**API appelées:**
- `GET /api/employees?isActive=true`

---

### 5. Page Profil Employé
**Chemin:** `/team/[id]`  
**Fichier:** `src/app/team/[id]/page.tsx`  
**Fonctionnalités:**
- Profil complet de l'employé
- Portfolio (photos des réalisations)
- Horaires de disponibilité
- Avis clients
- Formulaire de réservation

**Tests à effectuer:**
- ✅ Vérifier les informations de l'employé
- ✅ Tester le portfolio (galerie photos)
- ✅ Vérifier les horaires
- ✅ Tester le formulaire de réservation
- ✅ Vérifier les avis clients

**API appelées:**
- `GET /api/employees/[id]`
- `GET /api/employees/[id]/portfolio`
- `GET /api/employees/[id]/schedule`
- `GET /api/reviews?employeeId=[id]`

---

### 6. Page Boutique
**Chemin:** `/shop`  
**Fichier:** `src/app/shop/page.tsx`  
**Fonctionnalités:**
- Catalogue de produits
- Filtres (catégorie, prix, stock)
- Recherche de produits
- Pagination
- Ajout au panier

**Tests à effectuer:**
- ✅ Vérifier l'affichage de tous les produits
- ✅ Tester les filtres par catégorie
- ✅ Tester la recherche
- ✅ Vérifier le tri (prix, nouveautés)
- ✅ Tester l'ajout au panier
- ✅ Vérifier la pagination

**API appelées:**
- `GET /api/products?isActive=true&inStock=true`

---

### 7. Page Détails Produit
**Chemin:** `/shop/[slug]`  
**Fichier:** `src/app/shop/[slug]/page.tsx`  
**Fonctionnalités:**
- Galerie d'images du produit
- Description complète
- Prix (actuel et barré si promo)
- Sélecteur de quantité
- Avis clients
- Produits similaires

**Tests à effectuer:**
- ✅ Vérifier la galerie d'images (zoom, navigation)
- ✅ Tester le sélecteur de quantité
- ✅ Vérifier le stock disponible
- ✅ Tester l'ajout au panier
- ✅ Vérifier les avis produit
- ✅ Tester les produits similaires

**API appelées:**
- `GET /api/products/[id]`
- `GET /api/products?category=[category]&limit=4`

---

### 8. Page Panier
**Chemin:** `/shop/cart`  
**Fichier:** `src/app/shop/cart/page.tsx`  
**Fonctionnalités:**
- Liste des produits dans le panier
- Modification de quantité
- Suppression d'articles
- Calcul du total
- Code promo
- Bouton de paiement

**Tests à effectuer:**
- ✅ Vérifier l'affichage des produits du panier
- ✅ Tester la modification de quantité
- ✅ Tester la suppression d'articles
- ✅ Vérifier le calcul du total
- ✅ Tester l'application d'un code promo
- ✅ Tester le bouton "Commander"

**État local:** Redux store - `cartSlice`

---

### 9. Page Checkout
**Chemin:** `/shop/checkout`  
**Fichier:** `src/app/shop/checkout/page.tsx`  
**Fonctionnalités:**
- Formulaire d'adresse de livraison
- Choix du mode de paiement (Stripe, Orange Money, MOMO)
- Récapitulatif de la commande
- Validation et paiement

**Tests à effectuer:**
- ✅ Vérifier le formulaire d'adresse
- ✅ Tester la sélection du mode de paiement
- ✅ Vérifier le récapitulatif
- ✅ Tester le processus de paiement complet
- ✅ Vérifier les redirections après paiement

**API appelées:**
- `POST /api/orders` - Création de la commande
- `POST /api/payments/stripe/intent` - Intent Stripe
- `POST /api/payments/orange-money/initiate` - Orange Money
- `POST /api/payments/momo/initiate` - Mobile Money

---

### 10. Page Contact
**Chemin:** `/contact`  
**Fichier:** `src/app/contact/page.tsx`  
**Fonctionnalités:**
- Formulaire de contact
- Informations du salon (adresse, téléphone, email)
- Carte Google Maps
- Horaires d'ouverture

**Tests à effectuer:**
- ✅ Vérifier le formulaire de contact
- ✅ Tester l'envoi de message
- ✅ Vérifier la carte Google Maps
- ✅ Tester les liens de contact (email, téléphone)

**API appelées:**
- `POST /api/contact` (si implémenté)

---

## 🔐 Pages d'Authentification

### 11. Page d'Inscription
**Chemin:** `/register`  
**Fichier:** `src/app/(auth)/register/page.tsx`  
**Fonctionnalités:**
- Formulaire d'inscription
- Validation en temps réel
- Acceptation des CGU
- Connexion avec Google

**Tests à effectuer:**
- ✅ Vérifier tous les champs du formulaire
- ✅ Tester la validation (email, mot de passe fort, téléphone)
- ✅ Vérifier la checkbox CGU
- ✅ Tester l'inscription avec Google
- ✅ Tester l'inscription classique
- ✅ Vérifier les messages d'erreur
- ✅ Vérifier la redirection après inscription

**API appelées:**
- `POST /api/auth/register`

---

### 12. Page de Connexion
**Chemin:** `/login`  
**Fichier:** `src/app/(auth)/login/page.tsx`  
**Fonctionnalités:**
- Formulaire de connexion
- Connexion avec Google
- Lien "Mot de passe oublié"
- Lien vers inscription

**Tests à effectuer:**
- ✅ Tester la connexion avec email/password
- ✅ Tester la connexion Google
- ✅ Vérifier les messages d'erreur (mauvais identifiants)
- ✅ Tester le lien "Mot de passe oublié"
- ✅ Vérifier la redirection après connexion (selon le rôle)

**API appelées:**
- `POST /api/auth/login` (NextAuth)

---

### 13. Page Mot de Passe Oublié
**Chemin:** `/forgot-password`  
**Fichier:** `src/app/(auth)/forgot-password/page.tsx`  
**Fonctionnalités:**
- Formulaire avec email
- Envoi du lien de réinitialisation
- Confirmation d'envoi

**Tests à effectuer:**
- ✅ Tester l'envoi avec un email valide
- ✅ Vérifier le message de confirmation
- ✅ Tester avec un email inexistant
- ✅ Vérifier la réception de l'email

**API appelées:**
- `POST /api/auth/forgot-password`

---

### 14. Page Réinitialisation de Mot de Passe
**Chemin:** `/reset-password?token=...`  
**Fichier:** `src/app/(auth)/reset-password/page.tsx`  
**Fonctionnalités:**
- Formulaire nouveau mot de passe
- Validation token
- Confirmation de réinitialisation

**Tests à effectuer:**
- ✅ Tester avec token valide
- ✅ Tester avec token expiré
- ✅ Vérifier la validation du mot de passe
- ✅ Tester la réinitialisation complète
- ✅ Vérifier la redirection après succès

**API appelées:**
- `POST /api/auth/reset-password`

---

### 15. Page Vérification Email
**Chemin:** `/verify-email?token=...`  
**Fichier:** `src/app/(auth)/verify-email/page.tsx`  
**Fonctionnalités:**
- Vérification automatique du token
- Message de confirmation
- Lien vers connexion

**Tests à effectuer:**
- ✅ Tester avec token valide
- ✅ Tester avec token invalide
- ✅ Vérifier le message de succès
- ✅ Tester le lien de connexion

**API appelées:**
- `POST /api/auth/verify-email`

---

## 👤 Pages Client (Authentification requise - Role: CLIENT)

### 16. Page Réservation
**Chemin:** `/booking`  
**Fichier:** `src/app/booking/page.tsx`  
**Composants:**
- `BookingStepper` - Wizard de réservation
- `ServiceSelector` - Sélection du service
- `EmployeeSelector` - Choix de l'employé
- `DateTimePicker` - Choix date/heure
- `BookingSummary` - Récapitulatif

**Tests à effectuer:**
- ✅ **Étape 1:** Sélection du service
  - Vérifier l'affichage des services
  - Tester la recherche
  - Vérifier les détails (prix, durée)
- ✅ **Étape 2:** Choix de l'employé
  - Afficher les employés disponibles pour ce service
  - Permettre le choix "Pas de préférence"
- ✅ **Étape 3:** Date et heure
  - Calendrier avec disponibilités
  - Créneaux horaires disponibles
  - Vérification des conflits
- ✅ **Étape 4:** Lieu du service
  - Choix Salon/Domicile
  - Sélection d'adresse (si domicile)
  - Calcul des frais de déplacement
- ✅ **Étape 5:** Récapitulatif et confirmation
  - Vérifier toutes les informations
  - Afficher le prix total
  - Tester la confirmation

**API appelées:**
- `GET /api/services`
- `GET /api/employees?serviceId=[id]`
- `GET /api/appointments/availability?employeeId=[id]&date=[date]`
- `POST /api/appointments` (**⚠️ Nouvelle route DDD**)

**⚠️ Note importante:** La route `POST /api/appointments` a été migrée vers l'architecture DDD et utilise maintenant le Use Case `CreateAppointmentUseCase`.

---

### 17. Page Mes Rendez-vous
**Chemin:** `/appointments`  
**Fichier:** `src/app/appointments/page.tsx`  
**Fonctionnalités:**
- Liste de tous les rendez-vous
- Filtres (à venir, passés, annulés)
- Détails de chaque rendez-vous
- Actions (annuler, modifier, laisser un avis)

**Tests à effectuer:**
- ✅ Vérifier l'affichage des rendez-vous
- ✅ Tester les filtres par statut
- ✅ Tester l'annulation (si > 2h avant)
- ✅ Vérifier l'affichage des détails
- ✅ Tester le bouton "Laisser un avis"
- ✅ Vérifier les rendez-vous passés

**API appelées:**
- `GET /api/appointments` - Liste des RDV utilisateur
- `POST /api/appointments/cancel` - Annulation

---

### 18. Page Détails d'un Rendez-vous
**Chemin:** `/appointments/[id]`  
**Fichier:** `src/app/appointments/[id]/page.tsx`  
**Fonctionnalités:**
- Détails complets du RDV
- Informations employé
- Informations service
- QR Code de confirmation (si confirmé)
- Bouton d'annulation

**Tests à effectuer:**
- ✅ Vérifier tous les détails
- ✅ Tester le QR Code
- ✅ Vérifier les informations employé/service
- ✅ Tester l'annulation
- ✅ Vérifier les statuts (Pending, Confirmed, Completed, Cancelled)

**API appelées:**
- `GET /api/appointments/[id]`
- `POST /api/appointments/[id]/cancel`

---

### 19. Page Mon Profil
**Chemin:** `/profile`  
**Fichier:** `src/app/profile/page.tsx`  
**Fonctionnalités:**
- Informations personnelles
- Photo de profil
- Modification des données
- Changement de mot de passe
- Préférences (langue, notifications)

**Tests à effectuer:**
- ✅ Vérifier l'affichage des informations
- ✅ Tester la modification de la photo
- ✅ Tester la modification des données
- ✅ Tester le changement de mot de passe
- ✅ Tester les préférences
- ✅ Vérifier la validation des champs

**API appelées:**
- `GET /api/user/profile`
- `PUT /api/user/profile`
- `POST /api/upload` - Upload photo

---

### 20. Page Mes Adresses
**Chemin:** `/profile/addresses`  
**Fichier:** `src/app/profile/addresses/page.tsx`  
**Fonctionnalités:**
- Liste des adresses enregistrées
- Ajout d'une nouvelle adresse
- Modification/Suppression
- Définir adresse par défaut

**Tests à effectuer:**
- ✅ Vérifier la liste des adresses
- ✅ Tester l'ajout d'adresse
- ✅ Tester la modification
- ✅ Tester la suppression
- ✅ Tester la définition par défaut
- ✅ Vérifier l'intégration Google Maps

**API appelées:**
- `GET /api/user/addresses`
- `POST /api/user/addresses`
- `PUT /api/user/addresses/[id]`
- `DELETE /api/user/addresses/[id]`

---

### 21. Page Mes Commandes
**Chemin:** `/orders`  
**Fichier:** `src/app/orders/page.tsx`  
**Fonctionnalités:**
- Historique des commandes
- Filtres (statut, date)
- Détails de chaque commande
- Suivi de livraison

**Tests à effectuer:**
- ✅ Vérifier l'historique complet
- ✅ Tester les filtres
- ✅ Vérifier les détails
- ✅ Tester le suivi de livraison
- ✅ Vérifier les statuts

**API appelées:**
- `GET /api/orders`

---

### 22. Page Détails Commande
**Chemin:** `/orders/[id]`  
**Fichier:** `src/app/orders/[id]/page.tsx`  
**Fonctionnalités:**
- Détails complets de la commande
- Liste des produits
- Informations de paiement
- Adresse de livraison
- Suivi de livraison
- Facture téléchargeable

**Tests à effectuer:**
- ✅ Vérifier tous les détails
- ✅ Tester le suivi de livraison
- ✅ Télécharger la facture
- ✅ Vérifier les statuts
- ✅ Tester le bouton "Commander à nouveau"

**API appelées:**
- `GET /api/orders/[id]`
- `GET /api/orders/[id]/invoice` - Facture PDF

---

### 23. Page Mes Avis
**Chemin:** `/reviews`  
**Fichier:** `src/app/reviews/page.tsx`  
**Fonctionnalités:**
- Liste de tous les avis laissés
- Modification d'avis
- Suppression d'avis
- Statut (en attente, approuvé)

**Tests à effectuer:**
- ✅ Vérifier la liste des avis
- ✅ Tester la modification
- ✅ Tester la suppression
- ✅ Vérifier les statuts
- ✅ Tester l'ajout de photos

**API appelées:**
- `GET /api/reviews?userId=[id]`
- `PUT /api/reviews/[id]`
- `DELETE /api/reviews/[id]`

---

### 24. Page Programme de Fidélité
**Chemin:** `/loyalty`  
**Fichier:** `src/app/loyalty/page.tsx`  
**Fonctionnalités:**
- Solde de points
- Niveau de fidélité (Bronze, Silver, Gold, Platinum)
- Historique des transactions
- Récompenses disponibles
- Échange de points

**Tests à effectuer:**
- ✅ Vérifier le solde de points
- ✅ Vérifier le niveau actuel
- ✅ Tester l'historique
- ✅ Vérifier les récompenses disponibles
- ✅ Tester l'échange de points
- ✅ Vérifier les conditions de chaque niveau

**API appelées:**
- `GET /api/loyalty/points`
- `GET /api/loyalty/rewards`
- `POST /api/loyalty/redeem`

---

### 25. Page Favoris
**Chemin:** `/favorites`  
**Fichier:** `src/app/favorites/page.tsx`  
**Fonctionnalités:**
- Liste des services favoris
- Liste des produits favoris
- Liste des employés favoris
- Suppression de favoris

**Tests à effectuer:**
- ✅ Vérifier l'affichage des favoris
- ✅ Tester la suppression
- ✅ Tester l'ajout depuis services/produits
- ✅ Vérifier les liens vers détails

**API appelées:**
- `GET /api/user/favorites`
- `POST /api/user/favorites`
- `DELETE /api/user/favorites/[id]`

---

## 👨‍💼 Pages Employé (Role: EMPLOYEE)

### 26. Dashboard Employé
**Chemin:** `/employee`  
**Fichier:** `src/app/employee/page.tsx`  
**Fonctionnalités:**
- Statistiques du jour
- Prochains rendez-vous
- Revenus du mois
- Note moyenne
- Notifications

**Tests à effectuer:**
- ✅ Vérifier les statistiques
- ✅ Vérifier les RDV à venir
- ✅ Tester les liens vers détails
- ✅ Vérifier les revenus
- ✅ Vérifier la note moyenne

**API appelées:**
- `GET /api/employee/stats`
- `GET /api/employee/appointments?date=today`

---

### 27. Page Planning Employé
**Chemin:** `/employee/schedule`  
**Fichier:** `src/app/employee/schedule/page.tsx`  
**Fonctionnalités:**
- Calendrier des rendez-vous
- Vue jour/semaine/mois
- Ajout de disponibilités
- Blocage de créneaux (congés)
- Modification d'horaires

**Tests à effectuer:**
- ✅ Vérifier le calendrier
- ✅ Tester les vues (jour/semaine/mois)
- ✅ Tester l'ajout de disponibilités
- ✅ Tester le blocage de créneaux
- ✅ Vérifier les conflits

**API appelées:**
- `GET /api/employees/schedule?employeeId=[id]`
- `POST /api/employees/schedule`
- `PUT /api/employees/schedule/[id]`
- `DELETE /api/employees/schedule/[id]`

---

### 28. Page Rendez-vous Employé
**Chemin:** `/employee/appointments`  
**Fichier:** `src/app/employee/appointments/page.tsx`  
**Fonctionnalités:**
- Liste des rendez-vous
- Filtres (statut, date)
- Marquer comme "En cours"
- Marquer comme "Terminé"
- Notes de service

**Tests à effectuer:**
- ✅ Vérifier la liste des RDV
- ✅ Tester les filtres
- ✅ Tester le changement de statut
- ✅ Tester l'ajout de notes
- ✅ Vérifier les détails clients

**API appelées:**
- `GET /api/employee/appointments`
- `PUT /api/appointments/[id]/status`

---

### 29. Page Portfolio Employé
**Chemin:** `/employee/portfolio`  
**Fichier:** `src/app/employee/portfolio/page.tsx`  
**Fonctionnalités:**
- Galerie des réalisations
- Upload de photos
- Suppression de photos
- Description des réalisations

**Tests à effectuer:**
- ✅ Vérifier l'affichage de la galerie
- ✅ Tester l'upload de photos
- ✅ Tester la suppression
- ✅ Tester l'ajout de descriptions
- ✅ Vérifier le redimensionnement

**API appelées:**
- `GET /api/employees/[id]/portfolio`
- `POST /api/upload`
- `DELETE /api/employees/portfolio/[id]`

---

### 30. Page Statistiques Employé
**Chemin:** `/employee/stats`  
**Fichier:** `src/app/employee/stats/page.tsx`  
**Fonctionnalités:**
- Revenus par mois
- Nombre de clients
- Services les plus demandés
- Note moyenne évolution
- Graphiques

**Tests à effectuer:**
- ✅ Vérifier les graphiques
- ✅ Tester les filtres de période
- ✅ Vérifier les données affichées
- ✅ Tester l'export PDF

**API appelées:**
- `GET /api/employee/stats?startDate=[date]&endDate=[date]`

---

## 👨‍💼 Pages Admin (Role: ADMIN)

### 31. Dashboard Admin
**Chemin:** `/admin`  
**Fichier:** `src/app/admin/page.tsx`  
**Composants:**
- `DashboardStats` - Statistiques clés
- `ChartWidget` - Graphiques
- `DataTable` - Tableaux de données

**Tests à effectuer:**
- ✅ Vérifier les statistiques (revenus, clients, RDV)
- ✅ Vérifier les graphiques (revenus, services)
- ✅ Tester les filtres de période
- ✅ Vérifier les notifications admin

**API appelées:**
- `GET /api/admin/stats`
- `GET /api/admin/dashboard`

---

### 32. Page Gestion Utilisateurs
**Chemin:** `/admin/users`  
**Fichier:** `src/app/admin/users/page.tsx`  
**Fonctionnalités:**
- Liste de tous les utilisateurs
- Recherche et filtres
- Modification de rôle
- Désactivation/Activation
- Suppression

**Tests à effectuer:**
- ✅ Vérifier la liste complète
- ✅ Tester la recherche
- ✅ Tester les filtres (rôle, statut)
- ✅ Tester le changement de rôle
- ✅ Tester la désactivation
- ✅ Tester la pagination

**API appelées:**
- `GET /api/admin/users`
- `PUT /api/admin/users/[id]`
- `DELETE /api/admin/users/[id]`

---

### 33. Page Gestion Services
**Chemin:** `/admin/services`  
**Fichier:** `src/app/admin/services/page.tsx`  
**Fonctionnalités:**
- Liste des services
- Création de service
- Modification
- Suppression
- Activation/Désactivation

**Tests à effectuer:**
- ✅ Vérifier la liste
- ✅ Tester la création
- ✅ Tester la modification
- ✅ Tester la suppression
- ✅ Vérifier la validation des champs
- ✅ Tester l'upload d'image

**API appelées:**
- `GET /api/services`
- `POST /api/services`
- `PUT /api/services/[id]`
- `DELETE /api/services/[id]`

---

### 34. Page Gestion Produits
**Chemin:** `/admin/products`  
**Fichier:** `src/app/admin/products/page.tsx`  
**Fonctionnalités:**
- Liste des produits
- Gestion du stock
- Création/Modification/Suppression
- Alertes stock bas

**Tests à effectuer:**
- ✅ Vérifier la liste
- ✅ Tester la création
- ✅ Tester la gestion du stock
- ✅ Vérifier les alertes stock bas
- ✅ Tester l'upload multiple d'images

**API appelées:**
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/[id]`
- `DELETE /api/products/[id]`

---

### 35. Page Gestion Employés
**Chemin:** `/admin/employees`  
**Fichier:** `src/app/admin/employees/page.tsx`  
**Fonctionnalités:**
- Liste des employés
- Création d'employé
- Modification
- Gestion des spécialités
- Horaires de travail

**Tests à effectuer:**
- ✅ Vérifier la liste
- ✅ Tester la création
- ✅ Tester la modification
- ✅ Tester l'ajout de spécialités
- ✅ Tester la gestion des horaires

**API appelées:**
- `GET /api/employees`
- `POST /api/employees`
- `PUT /api/employees/[id]`
- `DELETE /api/employees/[id]`

---

### 36. Page Gestion Rendez-vous
**Chemin:** `/admin/appointments`  
**Fichier:** `src/app/admin/appointments/page.tsx`  
**Fonctionnalités:**
- Tous les rendez-vous
- Filtres avancés
- Modification de statut
- Annulation
- Création manuelle

**Tests à effectuer:**
- ✅ Vérifier tous les RDV
- ✅ Tester les filtres
- ✅ Tester la modification de statut
- ✅ Tester l'annulation
- ✅ Tester la création manuelle

**API appelées:**
- `GET /api/appointments`
- `POST /api/appointments` (admin)
- `PUT /api/appointments/[id]`
- `DELETE /api/appointments/[id]`

---

### 37. Page Gestion Commandes
**Chemin:** `/admin/orders`  
**Fichier:** `src/app/admin/orders/page.tsx`  
**Fonctionnalités:**
- Toutes les commandes
- Changement de statut
- Gestion de livraison
- Remboursements

**Tests à effectuer:**
- ✅ Vérifier toutes les commandes
- ✅ Tester le changement de statut
- ✅ Tester l'ajout de numéro de suivi
- ✅ Tester les remboursements
- ✅ Vérifier les filtres

**API appelées:**
- `GET /api/orders`
- `PUT /api/orders/[id]`
- `POST /api/orders/[id]/refund`

---

### 38. Page Gestion Avis
**Chemin:** `/admin/reviews`  
**Fichier:** `src/app/admin/reviews/page.tsx`  
**Fonctionnalités:**
- Tous les avis (approuvés et en attente)
- Approbation/Rejet
- Suppression
- Réponse aux avis

**Tests à effectuer:**
- ✅ Vérifier tous les avis
- ✅ Tester l'approbation
- ✅ Tester le rejet
- ✅ Tester la réponse
- ✅ Tester la suppression

**API appelées:**
- `GET /api/reviews?includeUnapproved=true`
- `PUT /api/reviews/[id]/approve`
- `POST /api/reviews/[id]/respond`
- `DELETE /api/reviews/[id]`

---

### 39. Page Gestion Fidélité
**Chemin:** `/admin/loyalty`  
**Fichier:** `src/app/admin/loyalty/page.tsx`  
**Fonctionnalités:**
- Gestion des récompenses
- Ajustement de points
- Configuration des niveaux
- Historique transactions

**Tests à effectuer:**
- ✅ Tester la création de récompenses
- ✅ Tester l'ajustement de points
- ✅ Tester la modification des niveaux
- ✅ Vérifier l'historique

**API appelées:**
- `GET /api/loyalty/rewards`
- `POST /api/loyalty/rewards`
- `POST /api/loyalty/adjust-points`

---

### 40. Page Gestion Notifications
**Chemin:** `/admin/notifications`  
**Fichier:** `src/app/admin/notifications/page.tsx`  
**Fonctionnalités:**
- Envoi de notifications globales
- Historique d'envoi
- Templates de notifications
- Notifications automatiques

**Tests à effectuer:**
- ✅ Tester l'envoi global
- ✅ Vérifier l'historique
- ✅ Tester les templates
- ✅ Tester les notifications auto

**API appelées:**
- `GET /api/notifications`
- `POST /api/notifications/send`
- `GET /api/notifications/templates`

---

### 41. Page Paramètres Salon
**Chemin:** `/admin/settings`  
**Fichier:** `src/app/admin/settings/page.tsx`  
**Fonctionnalités:**
- Informations du salon
- Horaires d'ouverture
- Frais de déplacement
- Paramètres de paiement
- SMTP et APIs

**Tests à effectuer:**
- ✅ Tester la modification des informations
- ✅ Tester les horaires
- ✅ Tester la configuration des frais
- ✅ Vérifier les clés API
- ✅ Tester la configuration SMTP

**API appelées:**
- `GET /api/admin/settings`
- `PUT /api/admin/settings`

---

### 42. Page Analytics
**Chemin:** `/admin/analytics`  
**Fichier:** `src/app/admin/analytics/page.tsx`  
**Fonctionnalités:**
- Revenus détaillés
- Services les plus populaires
- Employés performants
- Taux de remplissage
- Export de rapports

**Tests à effectuer:**
- ✅ Vérifier les graphiques
- ✅ Tester les filtres de période
- ✅ Tester l'export PDF/Excel
- ✅ Vérifier les comparaisons

**API appelées:**
- `GET /api/admin/analytics?startDate=[date]&endDate=[date]`

---

## 🧪 Pages de Test (Développement uniquement)

### 43-48. Pages de Test de Thème
**Chemins:**
- `/test-theme`
- `/test-error-dark`
- `/test-loading-dark`
- `/test-404-dark`
- `/test-verify-email-dark`
- `/test-verify-light`

**Objectif:** Tester les composants de thème et d'erreur dans différents modes (dark/light)

**Tests à effectuer:**
- ✅ Vérifier le rendu en mode dark
- ✅ Vérifier le rendu en mode light
- ✅ Tester le toggle de thème
- ✅ Vérifier les composants d'erreur
- ✅ Vérifier les composants de chargement

---

## 📊 Checklist Générale de Test

### Tests Fonctionnels
- [ ] Toutes les pages se chargent sans erreur
- [ ] Tous les liens de navigation fonctionnent
- [ ] Tous les formulaires valident correctement
- [ ] Toutes les API retournent les bonnes données
- [ ] Les messages d'erreur sont clairs et utiles
- [ ] Les redirections fonctionnent correctement

### Tests d'Authentification
- [ ] Inscription fonctionne (email + Google)
- [ ] Connexion fonctionne (email + Google)
- [ ] Déconnexion fonctionne
- [ ] Réinitialisation de mot de passe fonctionne
- [ ] Vérification d'email fonctionne
- [ ] Les rôles (CLIENT, EMPLOYEE, ADMIN) sont respectés
- [ ] Les pages protégées redirigent si non authentifié

### Tests de Performance
- [ ] Les pages se chargent en < 3 secondes
- [ ] Les images sont optimisées
- [ ] Le lazy loading fonctionne
- [ ] Pas de fuite mémoire
- [ ] Les bundles JavaScript sont optimisés

### Tests de Responsive Design
- [ ] Mobile (320px - 768px)
- [ ] Tablette (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Navigation mobile fonctionne
- [ ] Menu hamburger fonctionne

### Tests d'Accessibilité
- [ ] Navigation au clavier fonctionne
- [ ] Les images ont des alt text
- [ ] Les formulaires ont des labels
- [ ] Contraste des couleurs respecté (WCAG AA)
- [ ] Screen reader compatible

### Tests de Sécurité
- [ ] Validation côté serveur fonctionne
- [ ] Pas de XSS possible
- [ ] Pas d'injection SQL
- [ ] Les tokens expirent correctement
- [ ] HTTPS en production

### Tests de Multilinguisme
- [ ] Changement FR ↔ EN fonctionne
- [ ] Toutes les chaînes sont traduites
- [ ] Les URLs sont localisées
- [ ] Le stockage de la langue persiste

---

## 🔧 Outils de Test Recommandés

### Tests Manuels
- **Browser DevTools** - Inspecter réseau, console, performance
- **React DevTools** - Inspecter composants et state
- **Redux DevTools** - Inspecter le store

### Tests Automatisés
- **Playwright** ou **Cypress** - Tests E2E
- **Jest + React Testing Library** - Tests unitaires
- **Postman** - Tests API (voir `LEBARBIER_Backend_Tests.postman_collection.json`)

### Tests de Performance
- **Lighthouse** - Audit de performance
- **WebPageTest** - Tests de vitesse
- **Bundle Analyzer** - Analyse des bundles

---

## 🎯 Priorités de Test après Migration DDD

### Priorité HAUTE 🔴
1. **Page Réservation** (`/booking`) - Utilise la nouvelle route DDD
2. **API Appointments** - Vérifier CreateAppointmentUseCase
3. **Authentification** - Critiques pour toute l'app
4. **Paiements** - Stripe, Orange Money, MOMO

### Priorité MOYENNE 🟡
5. **Dashboard Admin** - Gestion quotidienne
6. **Page Employé** - Gestion des rendez-vous
7. **Profil Utilisateur** - Modifications fréquentes
8. **Commandes** - Cycle de vie complet

### Priorité BASSE 🟢
9. **Pages de test** - Développement uniquement
10. **Analytics** - Non critiques
11. **Statistiques** - Informatives

---

## 📝 Rapport de Bug - Template

Lorsque vous trouvez un bug, utilisez ce template :

```markdown
### 🐛 Bug Report

**Page concernée:** [URL de la page]
**Gravité:** [CRITIQUE / MAJEURE / MINEURE]
**Rôle utilisateur:** [CLIENT / EMPLOYEE / ADMIN / PUBLIC]

**Description:**
[Décrire le problème en détail]

**Étapes pour reproduire:**
1. Aller sur [page]
2. Cliquer sur [élément]
3. Remplir [formulaire]
4. Observer [erreur]

**Résultat attendu:**
[Ce qui devrait se passer]

**Résultat actuel:**
[Ce qui se passe réellement]

**Console Errors:**
```
[Copier les erreurs de la console]
```

**Screenshots:**
[Ajouter des captures d'écran si pertinent]

**Environnement:**
- Navigateur: [Chrome 120, Firefox 115, etc.]
- OS: [Windows 11, macOS 14, Linux, etc.]
- Device: [Desktop, Mobile, Tablet]
```

---

## ✅ Checklist de Validation Finale

Avant de déployer en production, vérifier :

- [ ] Toutes les pages listées ci-dessus ont été testées
- [ ] Aucune erreur TypeScript (`npm run type-check`)
- [ ] Aucune erreur ESLint (`npm run lint`)
- [ ] Build réussit sans erreur (`npm run build`)
- [ ] Variables d'environnement configurées
- [ ] Base de données migrée
- [ ] Clés API configurées (Stripe, Google Maps, etc.)
- [ ] SMTP configuré pour les emails
- [ ] Logs configurés
- [ ] Monitoring configuré (Sentry, etc.)
- [ ] Backup automatique configuré

---

## 📚 Ressources Complémentaires

- **Documentation API:** `docs/API.md`
- **Guide d'Architecture:** `docs/DDD_ARCHITECTURE.md`
- **Guide de Migration:** `docs/MIGRATION_GUIDE.md`
- **Collection Postman:** `LEBARBIER_Backend_Tests.postman_collection.json`
- **Guide de Contribution:** `docs/CONTRIBUTING.md`

---

## 🆘 Support

En cas de problème ou de question :
1. Consulter la documentation dans `docs/`
2. Vérifier les issues GitHub
3. Contacter l'équipe de développement

---

**Document créé le:** 4 janvier 2026  
**Dernière mise à jour:** 4 janvier 2026  
**Version de l'app:** 3.0.0 (Architecture DDD)
