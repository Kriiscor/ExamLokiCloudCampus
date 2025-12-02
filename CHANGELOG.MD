# Changelog

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2024-12-02

### ✅ Ajouté

#### Sécurité
- **Cookies HTTPOnly** : Stockage du token JWT dans un cookie HTTPOnly au lieu de localStorage pour prévenir les attaques XSS
- **Helmet.js** : Configuration des headers de sécurité HTTP (X-Frame-Options, CSP, HSTS, etc.)
- **express-mongo-sanitize** : Protection contre les injections NoSQL
- **Rate Limiting** : Limitation des tentatives de connexion (5/15min) et des requêtes générales (100/15min)
- **Validation Joi** : Schémas de validation stricts pour toutes les routes (auth, orders, products)
- **CORS sécurisé** : Configuration stricte avec liste blanche d'origines autorisées

#### Fonctionnalités
- **Authentification JWT** : Système complet login/register/logout
- **Gestion des rôles** : Séparation user/admin avec middleware de vérification
- **Panier d'achat** : Context API React avec gestion des quantités
- **Gestion des produits** : CRUD complet avec contrôle de stock
- **Gestion des commandes** : Création, suivi de statut, validation admin
- **Système de notification** : Microservice pour envoi d'emails
- **Gestion des stocks** : Microservice de mise à jour automatique

#### Infrastructure
- **Docker** : Dockerfiles pour backend/frontend + docker-compose.yml orchestrant MongoDB
- **CI/CD** : GitHub Actions pour déploiement automatisé
- **Logging** : Winston pour logs structurés (info, warn, error)
- **Health Check** : Endpoint `/health` pour monitoring

### 🔧 Corrigé

#### Vulnérabilités critiques
- **[CRITIQUE]** Suppression des logs de mots de passe en clair (authController.js:12)
- **[CRITIQUE]** Suppression des logs de tokens JWT (authController.js:24)
- **[CRITIQUE]** Suppression des logs d'objets user complets avec hash password (authController.js:17,48)
- **[ÉLEVÉE]** Messages d'erreur génériques pour login (ne révèle plus si user existe)
- **[ÉLEVÉE]** Ajout de validation du rôle utilisateur avec enum ('user', 'admin')
- **[ÉLEVÉE]** Ajout du flag `secure: true` sur les cookies en production
- **[MOYENNE]** Correction de la validation JWT avec gestion synchrone au lieu de callback dans try/catch
- **[MOYENNE]** Ajout de limitation de taille de payload (10kb max)
- **[MOYENNE]** Augmentation de l'exigence de mot de passe (6 caractères min avec maj/min/chiffre)

#### Bugs fonctionnels
- **Panier** : Correction du calcul du badge (affiche maintenant la quantité totale d'objets, pas le nombre de produits différents)
- **Panier** : Correction de l'ajout de produit avec quantité personnalisée (respecte maintenant action.payload.quantity)
- **Admin seeder** : Ajout d'un compte admin par défaut (username: admin, password: admin)
- **URL dynamiques** : Remplacement des URL en dur par des variables d'environnement

### 🚀 Amélioré

#### Performance
- **Payload limité** : Requêtes limitées à 10kb pour prévenir les attaques DoS
- **Cache CORS** : Preflight OPTIONS cachées 24h (maxAge: 86400)
- **Index MongoDB** : Champs unique indexés (email, username)

#### Code Quality
- **JSDoc** : Documentation complète des fonctions backend avec types et exemples
- **Commentaires React** : Documentation de tous les composants et hooks personnalisés
- **Logger Winston** : Remplacement des console.log par un système de logging structuré
- **Gestion d'erreurs** : Middleware global de gestion des erreurs avec logging
- **Séparation des préoccupations** : Architecture en couches (routes → controllers → services → models)

#### DX (Developer Experience)
- **Scripts NPM** : Scripts Docker (docker:up, docker:down, docker:logs, etc.)
- **Variables d'environnement** : Configuration centralisée avec .env.example
- **.dockerignore** : Optimisation des builds Docker
- **Health check endpoint** : Monitoring de l'état du serveur

### 🗑️ Supprimé
- Logs de données sensibles (passwords, tokens, user objects complets)
- URL hardcodées dans le code
- Header `X-Powered-By: Express` (via Helmet)
- Code commenté obsolète dans orderController.js

### 📝 Documentation
- **README.md** : Instructions complètes d'installation et configuration
- **DOCKER.md** : Guide Docker avec commandes et troubleshooting
- **JSDoc** : Documentation inline de toutes les fonctions backend
- **Commentaires** : Tous les composants React documentés
- **API Documentation** : Schémas de validation détaillés avec messages d'erreur explicites

### 🔐 Sécurité - Récapitulatif des corrections

| Vulnérabilité | Sévérité | Status | Correction |
|---------------|----------|--------|------------|
| Logs de mots de passe | CRITIQUE | ✅ | Supprimés |
| Logs de tokens JWT | CRITIQUE | ✅ | Supprimés |
| Absence de rate limiting | CRITIQUE | ✅ | Implémenté (express-rate-limit) |
| Injection NoSQL | CRITIQUE | ✅ | express-mongo-sanitize ajouté |
| Absence de Helmet | ÉLEVÉE | ✅ | Helmet configuré |
| Cookie non secure | ÉLEVÉE | ✅ | Flag secure en production |
| Messages d'erreur révélateurs | ÉLEVÉE | ✅ | Messages génériques |
| Validation rôle manquante | ÉLEVÉE | ✅ | Enum ajouté au modèle |
| Absence de CSRF | ÉLEVÉE | ⚠️ | SameSite strict (partiel) |
| Validation JWT incorrecte | MOYENNE | ✅ | Refactorisée |
| Payload illimité | MOYENNE | ✅ | Limite 10kb |
| Mot de passe faible | MOYENNE | ✅ | 6 car + complexité |

## [0.1.0] - 2024-11-XX

### ✅ Ajouté
- Version initiale du projet
- Structure backend Express avec MongoDB
- Frontend React avec Tailwind CSS
- Authentification basique

---

## Légende

- ✅ **Ajouté** : Nouvelles fonctionnalités
- 🔧 **Corrigé** : Corrections de bugs et vulnérabilités
- 🚀 **Amélioré** : Améliorations de fonctionnalités existantes
- 🗑️ **Supprimé** : Fonctionnalités ou code supprimés
- 📝 **Documentation** : Modifications de documentation
- 🔐 **Sécurité** : Corrections de vulnérabilités