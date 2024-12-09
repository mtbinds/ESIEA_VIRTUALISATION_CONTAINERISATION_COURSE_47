
# Projet final : Application en microservices avec Docker

**Note:** Ce projet ne concerne que les groupes : **44**, **45**, **46**, **47** et **48**

## Objectif

Vous allez développer une application web composée de plusieurs services conteneurisés. Ce projet en groupe vise à vous faire comprendre comment **créer**, **containeriser**, et **orchestrer** des services avec **Docker** et **Docker Compose**. Vous serez également amenés à gérer les interactions entre les différents services et à fournir une documentation complète.

---

## Description du projet

Votre application devra comporter les éléments suivants :

1. **Un backend (API)** :

   - Une **API REST** permettant de gérer des données **(exemple : gestion des utilisateurs, des produits ou des tâches)**.
   - Connexion à une base de données pour stocker les informations.

2. **Une base de données** :
   
   - Une base de données relationnelle **(MySQL, PostgreSQL)** ou **NoSQL (MongoDB)** pour gérer les données.

3. **Un frontend** :
   
   - Une interface utilisateur simple, interagissant avec l'**API** pour afficher, ajouter, ou modifier des données.

4. **Orchestration** :
   
   - Utilisation de **Docker Compose** pour orchestrer tous les services de l'application.

---

## Contraintes du projet

1. **En groupe** : Ce projet doit être réalisé en groupe de **3** à **4** étudiants.
2. **Technologies imposées** :
   
   - Backend : **Python (Flask ou FastAPI)** ou **Node.js (Express.js)**.
   - Base de données : **MySQL**, **PostgreSQL**, ou **MongoDB**.
   - Frontend : **HTML/CSS/JavaScript ou un framework (React, Vue.js)**.

3. **Docker** :

   - Chaque service doit être conteneurisé avec un `Dockerfile` spécifique.
   - L’ensemble de l’application doit être orchestré avec `docker-compose.yml`.

4. **Fonctionnalités minimales** :

   - **Backend :** Au moins **3** endpoints **(POST, GET, DELETE)**.
   - **Frontend :** Une interface utilisateur capable d’interagir avec les endpoints du backend.

5. **Respect des bonnes pratiques** :

   - Code clair et organisé avec des commentaires.
   - Utilisation de variables d’environnement pour les configurations sensibles (exemple : **mots de passe**, **connexions**).

6. **Deadline** : Le projet doit être remis au plus tard le **22 décembre 2024**, à minuit.

---

## Structure proposée du projet

Voici une structure suggérée pour organiser votre projet :

```
project/
│
├── backend/
│   ├── app/              # Code source du backend
│   ├── Dockerfile        # Conteneurisation du backend
│   └── requirements.txt  # Dépendances (si Python)
│
├── frontend/
│   ├── src/              # Code source du frontend
│   └── Dockerfile        # Conteneurisation du frontend
│
├── database/
│   └── Dockerfile        # Conteneurisation de la base de données
│
├── docker-compose.yml    # Orchestration des services
└── README.md             # Documentation du projet
```

---

## Étapes de réalisation

### 1. Planification

- Choisissez le thème de votre application **(par exemple : gestion de tâches, gestion d'utilisateurs, e-commerce, etc.)**.
- Définissez les fonctionnalités principales.

### 2. Développement du backend

- Implémentez une **API REST** avec les fonctionnalités suivantes :

  - **POST** : Ajouter des données.
  - **GET** : Récupérer des données.
  - **DELETE** : Supprimer des données.

- Ajoutez une connexion à la base de données pour stocker et gérer les données.

### 3. Développement du frontend

- Créez une interface utilisateur qui permet d’interagir avec l’**API**.
- Implémentez au moins :

  - Un formulaire pour ajouter des données.
  - Une liste affichant les données récupérées depuis l'**API**.

### 4. Conteneurisation avec Docker

- Écrivez un `Dockerfile` pour chaque service **(backend, frontend, base de données)**.
- Testez chaque service indépendamment dans un conteneur **Docker**.

### 5. Orchestration avec Docker Compose

- Configurez un réseau **Docker** pour permettre aux conteneurs de communiquer entre eux.
- Testez l’interaction entre les différents services.

### 6. Documentation

- Rédigez un fichier `README.md` détaillant :

  - Les prérequis pour exécuter le projet.
  - Les étapes pour exécuter l’application.
  - La liste des endpoints de l’**API**.
  - Les fonctionnalités de l’interface utilisateur.

---

## Contraintes supplémentaires

- Utilisez un système de versionnement **Git** pour suivre vos modifications.
- Les variables sensibles (comme les mots de passe) doivent être configurées dans un fichier `.env` et non dans le code source.
- La documentation doit inclure des captures d’écran ou des exemples d’exécution.

---

## Instructions pour tester l’application

### 1. Pré-requis

- Assurez-vous d'avoir **Docker** et **Docker Compose** installés sur votre machine.

### 2. Étapes pour exécuter le projet

1. Clonez le projet :

   ```bash
   git clone <url-du-repo>
   cd project
   ```

2. Construisez les images **Docker** :

   ```bash
   docker-compose build
   ```

3. Lancez l’application :
   
   ```bash
   docker-compose up
   ```

4. Testez les fonctionnalités :
   
   - **Backend :** Utilisez des outils comme `curl` ou **Postman** pour tester les endpoints.
   - **Frontend :** Ouvrez votre navigateur et interagissez avec l’application.

5. Nettoyez l’environnement (facultatif) :
   
   ```bash
   docker-compose down
   ```

---

## Critères d’évaluation

Votre projet sera évalué selon les critères suivants :

1. **Fonctionnalité** : L'application est fonctionnelle et respecte les consignes.
2. **Conteneurisation** : Chaque service est correctement conteneurisé avec un `Dockerfile`.
3. **Orchestration** : Les services fonctionnent ensemble grâce à **Docker Compose**.
4. **Documentation** : Un fichier `README.md` clair et complet est fourni.
5. **Qualité du code** : Le code est organisé, commenté, et suit les bonnes pratiques.

**Good Luck 🙂**

---