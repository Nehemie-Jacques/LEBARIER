# 📱 Guide d'Accès Mobile - LE BARBIER

Guide complet pour tester et accéder à l'application depuis votre téléphone ou tablette.

---

## 🎯 Objectif

Accéder à votre application Next.js en cours de développement depuis votre smartphone ou tablette pour tester :
- Le responsive design
- Les interactions tactiles
- Le mode dark/light automatique
- Les animations et performances

---

## ✅ Prérequis

1. **Ordinateur et téléphone sur le même WiFi** (obligatoire)
2. **Serveur Next.js en cours d'exécution** (`npm run dev`)
3. **Port 3000 ouvert dans le pare-feu** (configuration automatique ci-dessous)

---

## 🚀 Configuration Initiale (Une seule fois)

### Étape 1 : Modifier `package.json`

Le fichier a déjà été modifié pour exposer le serveur sur toutes les interfaces réseau :

```json
{
  "scripts": {
    "dev": "next dev -H 0.0.0.0"
  }
}
```

**Explication :**
- `-H 0.0.0.0` : Permet l'accès depuis n'importe quelle adresse IP du réseau local
- Par défaut, Next.js n'écoute que sur `localhost` (127.0.0.1)

### Étape 2 : Ouvrir le Port dans le Pare-feu

**Sur Linux (Ubuntu/Debian) :**
```bash
sudo ufw allow 3000/tcp
```

**Vérifier l'état du pare-feu :**
```bash
sudo ufw status
```

Vous devriez voir :
```
3000/tcp                   ALLOW       Anywhere
```

---

## 📍 Trouver Votre Adresse IP

### Méthode Rapide
```bash
hostname -I | awk '{print $1}'
```

**Votre IP actuelle :** `10.44.124.89`

### Méthode Alternative
```bash
ip addr show | grep "inet " | grep -v 127.0.0.1
```

---

## 🎮 Démarrer le Serveur

### 1. Démarrer le serveur de développement
```bash
npm run dev
```

### 2. Vérifier les URLs affichées
Vous devriez voir :
```
✔ Ready in 2.1s
  ➜ Local:    http://localhost:3000
  ➜ Network:  http://10.44.124.89:3000
```

**Si vous ne voyez pas "Network" :**
- Vérifiez que `package.json` contient bien `-H 0.0.0.0`
- Redémarrez le serveur (`Ctrl+C` puis `npm run dev`)

---

## 📱 Accès depuis Votre Téléphone

### Étape 1 : Connecter au même WiFi
Assurez-vous que votre téléphone est connecté au **même réseau WiFi** que votre ordinateur.

### Étape 2 : Ouvrir le navigateur mobile

**URL principale :**
```
http://10.44.124.89:3000
```

**Pages de test disponibles :**

| Page | URL | Description |
|------|-----|-------------|
| **Accueil** | `http://10.44.124.89:3000` | Page d'accueil |
| **Loading Dark** | `http://10.44.124.89:3000/test-loading-dark` | Tester la page de chargement en mode sombre |
| **Loading** | `http://10.44.124.89:3000/test-loading` | Tester la page de chargement |
| **Error** | `http://10.44.124.89:3000/test-error` | Tester la page d'erreur |

### Étape 3 : Tester le Responsive

Une fois la page ouverte :
- ✅ Rotation portrait/paysage
- ✅ Zoom tactile
- ✅ Navigation par gestes
- ✅ Animations et transitions
- ✅ Détection automatique du mode dark/light

---

## 🌓 Tester le Mode Dark/Light

L'application détecte automatiquement le thème de votre appareil grâce à `enableSystem` dans le `ThemeProvider`.

### Sur Android
1. **Paramètres** → **Affichage** → **Thème sombre**
2. Activer/Désactiver le mode sombre
3. Recharger la page → Le thème s'adapte automatiquement !

### Sur iOS
1. **Réglages** → **Luminosité et affichage** → **Apparence**
2. Sélectionner "Sombre" ou "Clair"
3. Recharger la page → Détection automatique !

---

## 🐛 Dépannage

### Problème : "Impossible de se connecter au serveur"

**Causes possibles :**

1. **Téléphone et PC sur des WiFi différents**
   - Vérifiez que les deux sont sur le même réseau

2. **Serveur non démarré**
   ```bash
   npm run dev
   ```

3. **Pare-feu bloque la connexion**
   ```bash
   sudo ufw allow 3000/tcp
   sudo ufw status
   ```

4. **Mauvaise adresse IP**
   ```bash
   # Vérifier l'IP actuelle
   hostname -I
   ```

### Problème : "ERR_CONNECTION_REFUSED"

**Vérifier que le serveur écoute sur 0.0.0.0 :**
```bash
netstat -tuln | grep 3000
```

Vous devriez voir :
```
tcp   0   0.0.0.0:3000   0.0.0.0:*   LISTEN
```

**Si vous voyez `127.0.0.1:3000` au lieu de `0.0.0.0:3000` :**
- Le serveur n'écoute que sur localhost
- Vérifiez `package.json` : `"dev": "next dev -H 0.0.0.0"`
- Redémarrez le serveur

### Problème : "Page blanche" ou "Erreur de chargement"

1. **Vider le cache du navigateur mobile**
2. **Forcer le rechargement** (tirer vers le bas)
3. **Vérifier les logs du serveur** dans le terminal

### Problème : "Net::ERR_ADDRESS_UNREACHABLE"

- Le téléphone ne peut pas atteindre le PC
- Vérifiez les paramètres WiFi (isolation des clients)
- Certains réseaux publics bloquent la communication entre appareils

---

## 🎨 Créer un QR Code (Optionnel)

Pour accéder rapidement sans taper l'URL :

### Installer qrencode
```bash
sudo apt install qrencode
```

### Générer le QR Code
```bash
qrencode -t ansiutf8 "http://10.44.124.89:3000"
```

Scannez le QR code avec l'appareil photo de votre téléphone ! 📸

### Alternative en ligne
Utilisez [qr-code-generator.com](https://www.qr-code-generator.com/) :
1. Entrez l'URL : `http://10.44.124.89:3000`
2. Générez le QR code
3. Scannez avec votre téléphone

---

## 🔒 Sécurité

### ⚠️ Important

- **Cette configuration est pour le développement uniquement**
- **Ne pas utiliser en production** (`-H 0.0.0.0` expose le serveur)
- **Pare-feu** : Le port 3000 est ouvert uniquement sur votre réseau local

### En Production

Utilisez plutôt :
- Un hébergeur (Vercel, Netlify, etc.)
- HTTPS avec certificat SSL
- Variables d'environnement sécurisées

---

## 📊 Checklist Rapide

Avant de tester sur mobile :

- [ ] Serveur démarré avec `npm run dev`
- [ ] `package.json` contient `-H 0.0.0.0`
- [ ] Port 3000 ouvert : `sudo ufw allow 3000/tcp`
- [ ] IP trouvée : `hostname -I`
- [ ] Téléphone et PC sur le même WiFi
- [ ] URL testée : `http://VOTRE_IP:3000`

---

## 💡 Astuces

### Raccourci Shell

Créez un alias dans `~/.bashrc` :
```bash
alias dev-mobile='echo "📱 Accès mobile:" && echo "http://$(hostname -I | awk "{print \$1}"):3000" && npm run dev'
```

Puis utilisez :
```bash
dev-mobile
```

### Tester Plusieurs Appareils

- Tablette : `http://10.44.124.89:3000`
- iPhone : `http://10.44.124.89:3000`
- Android : `http://10.44.124.89:3000`

Tous les appareils sur le même WiFi peuvent accéder simultanément !

---

## 🎯 Pages de Test Utiles

| Page | Description | URL |
|------|-------------|-----|
| Loading (Light) | Animation de chargement mode clair | `/test-loading` |
| Loading (Dark) | Animation de chargement mode sombre | `/test-loading-dark` |
| Error | Page d'erreur 500 | `/test-error` |
| Style Guide | Guide des composants UI | `/style-guide` (à créer) |

---

## 🆘 Support

### Vérification Réseau

```bash
# Vérifier la connectivité
ping 10.44.124.89

# Vérifier les ports ouverts
nmap 10.44.124.89

# Voir tous les appareils connectés au WiFi
arp -a
```

### Logs Utiles

```bash
# Logs du serveur Next.js
npm run dev

# Logs du pare-feu
sudo ufw status verbose

# Connexions actives
netstat -tuln | grep 3000
```

---

## ✅ Résumé

**Configuration :** 1 fois seulement
```bash
# 1. Modifier package.json : "dev": "next dev -H 0.0.0.0"
# 2. Ouvrir le port
sudo ufw allow 3000/tcp
```

**Utilisation quotidienne :**
```bash
# 1. Démarrer le serveur
npm run dev

# 2. Sur mobile, ouvrir :
# http://10.44.124.89:3000
```

---

**🎉 Vous êtes prêt à tester sur mobile ! Bon développement !**
