# 🔌 API Documentation - LE BARBIER

**Dernière mise à jour** : 19 Décembre 2025  
**Version** : 3.0.0  
**Base URL** : `http://localhost:3001` (dev) | `https://api.lebarbier.com` (prod)

---

## 📋 Table des Matières

1. [Authentification](#authentification)
2. [Profil Utilisateur](#profil-utilisateur)
3. [Rendez-vous (CRUD Complet)](#rendez-vous)
4. [Services (CRUD Complet)](#services)
5. [Employés](#employés)
6. [Admin](#admin)
7. [Codes de Statut](#codes-de-statut)

---

## �� Authentification

### Register (Inscription)
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+237600000000",
  "acceptTerms": true
}
```

**Réponse (201)**
```json
{
  "success": true,
  "message": "✅ Compte créé avec succès",
  "user": {
    "id": "cm...",
    "email": "user@example.com",
    "role": "CLIENT"
  }
}
```

### Login
```http
POST /api/auth/callback/credentials
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!"
}
```

### Logout
```http
POST /api/auth/logout
```

### Get Session
```http
GET /api/auth/session
```

---

## 👤 Profil Utilisateur

### Get My Profile
```http
GET /api/user/profile
Authorization: Required
```

### Update My Profile
```http
PUT /api/user/profile
Content-Type: application/json

{
  "firstName": "John Updated",
  "phone": "+237611111111"
}
```

---

## 📅 Rendez-vous (CRUD Complet)

### Get My Appointments
```http
GET /api/appointments
GET /api/appointments?status=PENDING
GET /api/appointments?startDate=2024-12-01&endDate=2024-12-31
```

**Query Parameters** :
- `status` : PENDING | CONFIRMED | IN_PROGRESS | COMPLETED | CANCELLED
- `startDate`, `endDate` : YYYY-MM-DD

### Create Appointment
```http
POST /api/appointments
Content-Type: application/json

{
  "employeeId": "cm...",
  "serviceId": "cm...",
  "date": "2024-12-20T10:00:00Z",
  "endTime": "2024-12-20T11:00:00Z",
  "location": "SALON",
  "notes": "Coupe classique"
}
```

**Location** : `SALON` (gratuit) | `HOME` (+5000 FCFA)

### Get Appointment by ID
```http
GET /api/appointments/{id}
```

### Update Appointment
```http
PUT /api/appointments/{id}
Content-Type: application/json

{
  "status": "CONFIRMED",
  "notes": "Notes mises à jour"
}
```

### Delete Appointment
```http
DELETE /api/appointments/{id}
```

### Check Availability
```http
GET /api/appointments/availability?employeeId={id}&date=2024-12-20
```

**Réponse** : Créneaux horaires de 8h à 18h avec disponibilité

---

## 💈 Services (CRUD Complet)

### Get All Services
```http
GET /api/services
Authorization: Public
```

**Réponse** : Liste des services + statistiques par catégorie

### Get Service by ID
```http
GET /api/services/{id}
Authorization: Public
```

### Create Service (ADMIN)
```http
POST /api/services
Content-Type: application/json
Authorization: ADMIN

{
  "name": "Coupe Premium",
  "description": "Coupe avec shampoing",
  "price": 15000,
  "duration": 60,
  "category": "COUPE",
  "imageUrl": "https://...",
  "isActive": true
}
```

**Categories** : COUPE | BARBE | COLORATION | SOIN | COMBO

### Update Service (ADMIN)
```http
PUT /api/services/{id}
Content-Type: application/json
Authorization: ADMIN
```

### Delete Service (ADMIN)
```http
DELETE /api/services/{id}
Authorization: ADMIN
```

---

## 👥 Employés

### Get All Employees
```http
GET /api/employees
Authorization: Public
```

### Get Employee by ID
```http
GET /api/employees/{id}
Authorization: Public
```

### Employee Appointments (EMPLOYEE/ADMIN)
```http
GET /api/employee/appointments
GET /api/employee/appointments?status=PENDING
GET /api/employee/appointments?date=2024-12-20
```

### Update Appointment Status (EMPLOYEE/ADMIN)
```http
PATCH /api/employee/appointments
Content-Type: application/json

{
  "appointmentId": "cm...",
  "status": "CONFIRMED"
}
```

---

## 👑 Admin

### Get All Users (ADMIN)
```http
GET /api/admin/users
GET /api/admin/users?role=CLIENT
GET /api/admin/users?search=john
GET /api/admin/users?isActive=true
```

### Create User (ADMIN)
```http
POST /api/admin/users
Content-Type: application/json

{
  "email": "employee@lebarbier.com",
  "password": "Password123!",
  "firstName": "Marie",
  "lastName": "Dupont",
  "phone": "+237622222222",
  "role": "EMPLOYEE"
}
```

---

## 📊 Codes de Statut

- `200` - OK
- `201` - Created
- `400` - Bad Request (données invalides)
- `401` - Unauthorized (non authentifié)
- `403` - Forbidden (non autorisé)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🛡️ Authentification

L'API utilise **NextAuth v5** avec cookies.

### Niveaux d'accès
- **Public** : Sans authentification
- **Required** : Authentification requise
- **EMPLOYEE** : Employés et admins
- **ADMIN** : Admins uniquement

---

## 📝 Format des Erreurs

```json
{
  "error": "Message d'erreur",
  "details": [
    {
      "field": "email",
      "message": "Email invalide"
    }
  ]
}
```

---

**Documentation** : 19 Décembre 2025  
**Contact** : support@lebarbier.com
