# Indications pour le LAB

Pour accomplir les deux exercices décrits dans ce LAB, vous devez créer un Dockerfile pour chaque application et suivre les étapes décrites. Voici comment vous pouvez les accomplir :

## Exercice: Partie 1

- Téléchargez l'application Node.js depuis le lien fourni dans l'exercice. Vous devriez avoir un dossier contenant les fichiers de l'application.

- Créez un fichier `Dockerfile` dans le même répertoire que les fichiers de l'application.

- Éditez le `Dockerfile` pour qu'il ressemble à ceci :

```Dockerfile
# Étape 1: Utilisez l'image node:alpine comme base
FROM node:alpine

# Étape 2: Définissez le répertoire de travail
WORKDIR /home/node

# Étape 3: Copiez le fichier package.json et le fichier package-lock.json pour installer les dépendances de production
COPY package*.json ./

# Étape 4: Installez les dépendances de production
RUN npm install --only=production

# Étape 5: Copiez l'ensemble du code de l'application dans le répertoire de travail
COPY . .

# Étape 6: Définissez la commande par défaut pour démarrer l'application
CMD ["npm", "run", "start"]
```

- Après avoir créé le Dockerfile, assurez-vous d'être dans le même répertoire que le Dockerfile, puis exécutez la commande suivante pour construire l'image Docker :

```bash
docker build -t lab-images:latest .
```
- Une fois l'image `Docker` construite avec succès, vous pouvez la tester en exécutant le conteneur Docker :

```bash
docker run -p 3000:3000 lab-images:latest
```
- Accédez à l'application `Node.js` depuis un navigateur en ouvrant http://localhost:3000. Vous devriez voir l'interface "express website".

- Pour vérifier la sensibilité à la variable d'environnement PORT, exécutez la commande suivante avec un port différent :

```bash
docker run --rm -e PORT=2000 -p 3000:2000 lab-images:latest
```
- Ouvrez votre navigateur sur http://localhost:3000 à nouveau, et vous devriez toujours voir le même résultat.

## Exercice: Partie 2

- Téléchargez ou installez le projet `Uno` depuis le lien `Github` fourni dans l'exercice.

- Accédez au dossier contenant le projet `Uno`.

- Créez un fichier `Dockerfile` dans le même répertoire que les fichiers du projet `Uno`.

- Éditez le `Dockerfile` pour qu'il ressemble à ceci :

```Dockerfile
# Étape 1: Utilisez l'image node:alpine comme base
FROM node:alpine as build

# Étape 2: Définissez le répertoire de travail
WORKDIR /home/app

# Étape 3: Copiez le fichier package.json et le fichier package-lock.json pour installer les dépendances
COPY package*.json ./

# Étape 4: Installez les dépendances
RUN npm install

# Étape 5: Utilisez Webpack pour build les fichiers statiques
RUN npm run build

# Étape 6: Créez une seconde étape en utilisant l'image nginx:alpine
FROM nginx:alpine

# Étape 7: Copiez les fichiers statiques buildés depuis l'étape précédente dans l'image nginx
COPY --from=build /home/app/build /usr/share/nginx/html

# Étape 8: Exposez le port 80
EXPOSE 80
```
- Une fois le Dockerfile créé, assurez-vous d'être dans le même répertoire que le Dockerfile, puis exécutez la commande suivante pour construire l'image `Docker` (remplacez <nom-de-votre-image> par le nom de votre choix) :

```bash
docker build -t <nom-de-votre-image> .
```
Après avoir construit l'image avec succès, vous pouvez la tester en exécutant le conteneur Docker :

```bash
docker run --rm -p 80:80 <nom-de-votre-image>
```
- Ouvrez votre navigateur sur http://localhost pour vérifier que le site `Uno` s'affiche correctement.

- En suivant ces étapes, vous devriez être en mesure de créer des images `Docker` pour les deux applications et de les exécuter avec succès dans des conteneurs `Docker`.




