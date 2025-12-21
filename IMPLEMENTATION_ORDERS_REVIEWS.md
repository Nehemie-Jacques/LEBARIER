# 🛍️ Implémentation APIs Orders & Reviews

## 📋 Vue d'ensemble

Ce document détaille l'implémentation complète des APIs de **Commandes (Orders)** et **Avis (Reviews)** pour le système LE BARBIER.

### 🎯 Endpoints implémentés

#### **Orders API - 5 endpoints**
- `GET /api/orders` - Liste des commandes (avec filtres)
- `POST /api/orders` - Créer une commande
- `GET /api/orders/[id]` - Détails d'une commande
- `PUT /api/orders/[id]` - Mettre à jour une commande
- `DELETE /api/orders/[id]` - Supprimer une commande (Admin)

#### **Reviews API - 5 endpoints**
- `GET /api/reviews` - Liste des avis (avec filtres)
- `POST /api/reviews` - Créer un avis
- `GET /api/reviews/[id]` - Détails d'un avis
- `PUT /api/reviews/[id]` - Mettre à jour/Approuver/Répondre à un avis
- `DELETE /api/reviews/[id]` - Supprimer un avis

---

## 📁 Structure des fichiers

```
src/app/api/
├── orders/
│   ├── route.ts              # GET (liste), POST (créer)
│   └── [id]/
│       └── route.ts          # GET, PUT, DELETE (détails/modifier/supprimer)
│
└── reviews/
    ├── route.ts              # GET (liste), POST (créer)
    └── [id]/
        └── route.ts          # GET, PUT (approve/respond), DELETE
```

---

## 🛍️ API Orders - Détails

### 1. **GET /api/orders** - Liste des commandes

**Authentification** : ✅ Requise (Utilisateur ou Admin)

**Access Control** :
- Utilisateur normal : voit uniquement ses commandes
- Admin : voit toutes les commandes (avec filtres)

**Query Parameters** :
```typescript
{
  userId?: string,           // Filtrer par utilisateur (Admin seulement)
  status?: OrderStatus,      // PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED
  orderNumber?: string,      // Recherche partielle (case-insensitive)
  page?: number,             // Pagination (défaut: 1)
  limit?: number             // Items par page (défaut: 20)
}
```

**Response** :
```json
{
  "success": true,
  "orders": [
    {
      "id": "order_id",
      "orderNumber": "ORD-1703123456789-ABC123XYZ",
      "userId": "user_id",
      "user": {
        "id": "user_id",
        "name": "Jean Dupont",
        "email": "jean@example.com",
        "image": "https://..."
      },
      "subtotal": 45000,
      "shippingFee": 2500,
      "discount": 0,
      "total": 47500,
      "status": "PENDING",
      "shippingAddress": "123 Rue Example, Douala",
      "trackingNumber": null,
      "notes": "Livraison après 18h",
      "items": [
        {
          "id": "item_id",
          "productId": "product_id",
          "quantity": 2,
          "price": 15000,
          "total": 30000,
          "product": {
            "id": "product_id",
            "name": "Tondeuse Pro",
            "nameEn": "Pro Clipper",
            "slug": "tondeuse-pro",
            "images": ["https://..."],
            "price": 15000
          }
        }
      ],
      "payment": {
        "id": "payment_id",
        "method": "ORANGE_MONEY",
        "status": "PAID",
        "amount": 47500,
        "paidAt": "2025-12-20T10:30:00Z"
      },
      "createdAt": "2025-12-20T10:00:00Z",
      "updatedAt": "2025-12-20T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  },
  "statistics": {
    "total": 42,
    "byStatus": {
      "PENDING": { "count": 5, "totalAmount": 125000 },
      "CONFIRMED": { "count": 8, "totalAmount": 380000 },
      "PROCESSING": { "count": 3, "totalAmount": 95000 },
      "SHIPPED": { "count": 10, "totalAmount": 450000 },
      "DELIVERED": { "count": 12, "totalAmount": 520000 },
      "CANCELLED": { "count": 3, "totalAmount": 72000 },
      "REFUNDED": { "count": 1, "totalAmount": 25000 }
    }
  }
}
```

---

### 2. **POST /api/orders** - Créer une commande

**Authentification** : ✅ Requise

**Request Body** :
```json
{
  "items": [
    {
      "productId": "product_id_1",
      "quantity": 2
    },
    {
      "productId": "product_id_2",
      "quantity": 1
    }
  ],
  "shippingAddress": "123 Rue Example, Douala",
  "notes": "Livraison après 18h"
}
```

**Validation** :
- ✅ Au moins 1 article requis
- ✅ Produits actifs et en stock
- ✅ Stock suffisant pour chaque produit
- ✅ Calcul automatique des prix (subtotal, shipping, total)

**Business Logic** :
- Génération automatique du `orderNumber` : `ORD-{timestamp}-{random9chars}`
- Frais de livraison :
  - **GRATUIT** si `subtotal >= 50,000 FCFA`
  - **2,500 FCFA** sinon
- Décrémentation automatique du stock (transaction Prisma)
- Statut initial : `PENDING`

**Response** (201 Created) :
```json
{
  "success": true,
  "order": {
    "id": "order_id",
    "orderNumber": "ORD-1703123456789-ABC123XYZ",
    "userId": "user_id",
    "subtotal": 45000,
    "shippingFee": 2500,
    "discount": 0,
    "total": 47500,
    "status": "PENDING",
    "items": [...],
    "user": {...}
  },
  "message": "Commande créée avec succès"
}
```

**Errors** :
- `400` : Produit non disponible / Stock insuffisant
- `404` : Produit introuvable

---

### 3. **GET /api/orders/[id]** - Détails d'une commande

**Authentification** : ✅ Requise

**Access Control** :
- Utilisateur : peut voir uniquement ses propres commandes
- Admin : peut voir toutes les commandes

**Response** :
```json
{
  "success": true,
  "order": {
    "id": "order_id",
    "orderNumber": "ORD-1703123456789-ABC123XYZ",
    "user": {
      "id": "user_id",
      "name": "Jean Dupont",
      "email": "jean@example.com",
      "phone": "+237690000000",
      "image": "https://..."
    },
    "items": [...],
    "payment": {...},
    "subtotal": 45000,
    "shippingFee": 2500,
    "discount": 0,
    "total": 47500,
    "status": "SHIPPED",
    "trackingNumber": "TRACK123456789",
    "shippingAddress": "123 Rue Example, Douala",
    "notes": "Livraison après 18h",
    "createdAt": "2025-12-20T10:00:00Z",
    "updatedAt": "2025-12-21T14:30:00Z"
  }
}
```

---

### 4. **PUT /api/orders/[id]** - Mettre à jour une commande

**Authentification** : ✅ Requise

**Access Control** :
- **Utilisateur** : Peut uniquement ANNULER sa commande (si `PENDING` ou `CONFIRMED`)
- **Admin** : Peut modifier tous les champs et tous les statuts

**Request Body** :
```json
{
  "status": "SHIPPED",
  "trackingNumber": "TRACK123456789",
  "shippingAddress": "Nouvelle adresse",
  "notes": "Mise à jour notes"
}
```

**Business Logic** :
- Si annulation (`CANCELLED`) : remettre le stock automatiquement
- Utilisateur non-admin :
  - Peut uniquement passer à `CANCELLED`
  - Uniquement si statut actuel = `PENDING` ou `CONFIRMED`

**Response** :
```json
{
  "success": true,
  "order": {...},
  "message": "Commande mise à jour avec succès"
}
```

**Errors** :
- `403` : Non autorisé / Vous ne pouvez que annuler votre commande
- `400` : Vous ne pouvez plus annuler cette commande
- `404` : Commande introuvable

---

### 5. **DELETE /api/orders/[id]** - Supprimer une commande

**Authentification** : ✅ Admin uniquement

**Business Logic** :
- Remettre le stock si statut ≠ `DELIVERED`, `CANCELLED`, `REFUNDED`
- Suppression en cascade : `OrderItem`, `Payment`

**Response** :
```json
{
  "success": true,
  "message": "Commande supprimée avec succès"
}
```

---

## ⭐ API Reviews - Détails

### 1. **GET /api/reviews** - Liste des avis

**Authentification** : ❌ Publique

**Query Parameters** :
```typescript
{
  employeeId?: string,      // Avis pour un employé spécifique
  userId?: string,          // Avis d'un utilisateur
  isApproved?: boolean,     // true/false
  minRating?: number,       // 1-5 (filtre serviceRating OU employeeRating)
  page?: number,
  limit?: number
}
```

**Response** :
```json
{
  "success": true,
  "reviews": [
    {
      "id": "review_id",
      "userId": "user_id",
      "user": {
        "id": "user_id",
        "name": "Jean Dupont",
        "image": "https://..."
      },
      "appointmentId": "appointment_id",
      "appointment": {
        "id": "appointment_id",
        "date": "2025-12-15T14:00:00Z",
        "service": {
          "id": "service_id",
          "name": "Coupe Classique",
          "nameEn": "Classic Haircut"
        }
      },
      "employeeId": "employee_id",
      "employee": {
        "id": "employee_id",
        "bio": "Barbier professionnel...",
        "user": {
          "id": "user_id",
          "name": "Marc Coiffeur",
          "image": "https://..."
        }
      },
      "serviceRating": 5,
      "employeeRating": 5,
      "comment": "Excellent service, très professionnel !",
      "photos": ["https://photo1.jpg", "https://photo2.jpg"],
      "response": "Merci pour votre retour !",
      "respondedAt": "2025-12-16T10:00:00Z",
      "isApproved": true,
      "createdAt": "2025-12-15T18:00:00Z",
      "updatedAt": "2025-12-16T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 156,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  },
  "statistics": {
    "total": 156,
    "approved": 142,
    "pending": 14,
    "averageServiceRating": 4.6,
    "averageEmployeeRating": 4.7
  }
}
```

---

### 2. **POST /api/reviews** - Créer un avis

**Authentification** : ✅ Requise

**Request Body** :
```json
{
  "appointmentId": "appointment_id",
  "employeeId": "employee_id",
  "serviceRating": 5,
  "employeeRating": 5,
  "comment": "Excellent service, très professionnel !",
  "photos": ["https://photo1.jpg", "https://photo2.jpg"]
}
```

**Validation** :
- ✅ Rendez-vous doit exister et appartenir à l'utilisateur
- ✅ Rendez-vous doit être `COMPLETED`
- ✅ Employé doit correspondre au rendez-vous
- ✅ Pas d'avis existant pour ce rendez-vous (1 avis par RDV)
- ✅ Ratings : 1-5
- ✅ Photos : URLs valides

**Business Logic** :
- Statut initial : `isApproved = false` (nécessite approbation admin)
- Mise à jour automatique de la note moyenne de l'employé (uniquement avis approuvés)

**Response** (201 Created) :
```json
{
  "success": true,
  "review": {...},
  "message": "Avis créé avec succès (en attente d'approbation)"
}
```

**Errors** :
- `400` : RDV pas terminé / Avis existe déjà / Employé non correspondant
- `403` : Ce rendez-vous ne vous appartient pas
- `404` : Rendez-vous introuvable

---

### 3. **GET /api/reviews/[id]** - Détails d'un avis

**Authentification** : ❌ Publique

**Response** :
```json
{
  "success": true,
  "review": {
    "id": "review_id",
    "user": {...},
    "employee": {...},
    "appointment": {
      "id": "appointment_id",
      "date": "2025-12-15T14:00:00Z",
      "service": {
        "id": "service_id",
        "name": "Coupe Classique",
        "nameEn": "Classic Haircut",
        "price": 5000
      }
    },
    "serviceRating": 5,
    "employeeRating": 5,
    "comment": "Excellent !",
    "photos": [...],
    "response": "Merci !",
    "respondedAt": "2025-12-16T10:00:00Z",
    "isApproved": true
  }
}
```

---

### 4. **PUT /api/reviews/[id]** - Mettre à jour / Approuver / Répondre

**Authentification** : ✅ Requise (différents niveaux selon action)

#### **Action 1 : Modifier l'avis** (Propriétaire ou Admin)
**Query** : Aucun paramètre `action`

**Request Body** :
```json
{
  "comment": "Nouveau commentaire",
  "photos": ["https://..."],
  "serviceRating": 4,
  "employeeRating": 5
}
```

**Business Logic** :
- Si modifié par utilisateur (non-admin) : `isApproved = false` (re-modération)
- Recalcul de la note employé si `employeeRating` change

---

#### **Action 2 : Approuver/Rejeter** (Admin uniquement)
**Query** : `?action=approve`

**Request Body** :
```json
{
  "isApproved": true
}
```

**Business Logic** :
- Si approuvé : recalculer la note moyenne de l'employé

**Response** :
```json
{
  "success": true,
  "review": {...},
  "message": "Avis approuvé avec succès"
}
```

---

#### **Action 3 : Répondre à un avis** (Admin uniquement)
**Query** : `?action=respond`

**Request Body** :
```json
{
  "response": "Merci pour votre retour positif !"
}
```

**Business Logic** :
- Ajoute `response` et `respondedAt`

**Response** :
```json
{
  "success": true,
  "review": {...},
  "message": "Réponse ajoutée avec succès"
}
```

---

### 5. **DELETE /api/reviews/[id]** - Supprimer un avis

**Authentification** : ✅ Requise

**Access Control** :
- Propriétaire de l'avis
- Admin

**Business Logic** :
- Recalcul automatique de la note moyenne de l'employé

**Response** :
```json
{
  "success": true,
  "message": "Avis supprimé avec succès"
}
```

---

## 🔐 Schemas de validation Zod

### Orders

```typescript
// Créer une commande
const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  })).min(1, 'Au moins un article requis'),
  shippingAddress: z.string().optional(),
  notes: z.string().optional(),
});

// Mettre à jour une commande
const updateOrderSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']).optional(),
  trackingNumber: z.string().optional(),
  shippingAddress: z.string().optional(),
  notes: z.string().optional(),
});
```

### Reviews

```typescript
// Créer un avis
const createReviewSchema = z.object({
  appointmentId: z.string(),
  employeeId: z.string(),
  serviceRating: z.number().int().min(1).max(5),
  employeeRating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  photos: z.array(z.string().url()).optional(),
});

// Mettre à jour un avis
const updateReviewSchema = z.object({
  comment: z.string().optional(),
  photos: z.array(z.string().url()).optional(),
  serviceRating: z.number().int().min(1).max(5).optional(),
  employeeRating: z.number().int().min(1).max(5).optional(),
});

// Répondre à un avis
const respondReviewSchema = z.object({
  response: z.string().min(1, 'La réponse ne peut pas être vide'),
});

// Approuver un avis
const approveReviewSchema = z.object({
  isApproved: z.boolean(),
});
```

---

## 📊 Statistiques & Business Logic

### Orders

1. **Gestion automatique du stock**
   - Décrémentation lors de la création
   - Incrémentation lors de l'annulation/suppression

2. **Calcul des frais**
   - Subtotal = Σ (prix × quantité)
   - Shipping = 2500 FCFA (gratuit si subtotal ≥ 50,000)
   - Total = Subtotal + Shipping - Discount

3. **Numéro de commande unique**
   - Format : `ORD-{timestamp}-{9_random_chars}`
   - Exemple : `ORD-1703123456789-ABC123XYZ`

4. **Statuts de commande**
   ```
   PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED
                ↓
            CANCELLED / REFUNDED
   ```

### Reviews

1. **Calcul de la note employé**
   - Moyenne des `employeeRating` de tous les avis **approuvés**
   - Mise à jour automatique à chaque création/modification/suppression/approbation

2. **Workflow d'approbation**
   ```
   Créé (isApproved=false) → Admin approuve → isApproved=true → Visible publiquement
   ```

3. **Contraintes**
   - 1 avis par rendez-vous (unique constraint)
   - Rendez-vous doit être `COMPLETED`
   - Modification par utilisateur = re-modération

---

## 🎯 Exemples d'utilisation

### Créer une commande

```bash
curl -X POST https://api.lebarbier.com/api/orders \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "items": [
      {
        "productId": "prod_123",
        "quantity": 2
      },
      {
        "productId": "prod_456",
        "quantity": 1
      }
    ],
    "shippingAddress": "123 Rue Example, Douala",
    "notes": "Livraison après 18h"
  }'
```

### Annuler une commande (Utilisateur)

```bash
curl -X PUT https://api.lebarbier.com/api/orders/order_123 \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "status": "CANCELLED"
  }'
```

### Créer un avis

```bash
curl -X POST https://api.lebarbier.com/api/reviews \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "appointmentId": "appt_123",
    "employeeId": "emp_456",
    "serviceRating": 5,
    "employeeRating": 5,
    "comment": "Excellent service !",
    "photos": ["https://photo1.jpg"]
  }'
```

### Approuver un avis (Admin)

```bash
curl -X PUT "https://api.lebarbier.com/api/reviews/review_123?action=approve" \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "isApproved": true
  }'
```

### Répondre à un avis (Admin)

```bash
curl -X PUT "https://api.lebarbier.com/api/reviews/review_123?action=respond" \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "response": "Merci pour votre retour positif !"
  }'
```

---

## 📈 Résumé

### ✅ Implémentés
- **10 nouveaux endpoints** (5 Orders + 5 Reviews)
- Gestion complète du cycle de vie des commandes
- Système d'avis avec modération et réponses
- Calcul automatique des frais de livraison
- Gestion intelligente du stock
- Mise à jour automatique des notes employés
- Pagination et statistiques sur tous les endpoints GET
- Access control granulaire

### 🎨 Fonctionnalités clés

**Orders** :
- ✅ Création avec validation stock
- ✅ Gestion multi-statuts
- ✅ Calcul automatique frais de livraison
- ✅ Annulation avec remise en stock
- ✅ Tracking number
- ✅ Statistiques par statut

**Reviews** :
- ✅ Double notation (service + employé)
- ✅ Photos multiples
- ✅ Système d'approbation
- ✅ Réponses admin
- ✅ Calcul automatique note employé
- ✅ Contrainte 1 avis/rendez-vous
- ✅ Re-modération si modification utilisateur

### 🔒 Sécurité
- Authentification sur tous les endpoints critiques
- Access control différencié (User/Admin)
- Validation Zod stricte
- Vérification ownership (commandes, avis)
- Transactions Prisma pour intégrité stock

---

**Total endpoints backend** : 48+ 🚀
