# Indications pour le LAB

- Le LAB "Gérer la donnée avec les volumes & mountpoints" consiste à apprendre à gérer la persistance des données entre les conteneurs Docker en utilisant des volumes et des montages (mountpoints). Voici un guide détaillé pour chaque partie de l'exercice :

## Partie 1: Persister des données avec les volumes

### Étape 1: Créer un volume Docker

- Pour créer un volume Docker nommé lab-volume, vous pouvez exécuter la commande suivante :

```bash
docker volume create lab-volume
```
- Cela crée un volume qui sera utilisé pour stocker des données persistantes entre les conteneurs.

### Étape 2: Exécuter un conteneur Node.js

- Pour exécuter un conteneur `Node.js` avec le script `index.js` monté à l'intérieur, ainsi que le volume lab-volume, utilisez la commande suivante :

```bash
docker run -v lab-volume:/data -v $(pwd)/index.js:/home/app/index.js node:alpine node /home/app/index.js
```

- `-v lab-volume:/data` monte le volume Docker `lab-volume` à l'emplacement `/data` dans le conteneur.
- `-v $(pwd)/index.js:/home/app/index.js` monte le fichier index.js de votre système local dans le conteneur à l'emplacement `/home/app/index.js`.
- `node:alpine` est l'image du conteneur `Node.js` utilisée.
- `node /home/app/index.js` exécute le script `Node.js` dans le conteneur.
- Cela exécute le script `index.js` et génère un fichier dans le volume `lab-volume`.

### Étape 3: Vérifier les fichiers générés

- Pour vérifier les fichiers générés dans le volume lab-volume, utilisez la commande suivante :

```bash
docker run -v lab-volume:/data node:alpine ls /data
```
- Cela affichera la liste des fichiers générés dans le volume `lab-volume`.

## Partie 2: Utiliser un montage pour un site Web

### Étape 1: Modifier le contenu du site Web

- Ouvrez le dossier lab-volumes-web dans votre éditeur de texte et modifiez le contenu du fichier index.html. Par exemple, changez le texte "Hello" en "Hello, a été modifié".

### Étape 2: Exécuter un conteneur Nginx avec un montage

- Pour exécuter un conteneur `Nginx` avec le dossier ***lab-volumes-web*** monté à l'intérieur, utilisez la commande suivante :

```bash
docker run -p 80:80 -v $(pwd)/lab-volumes-web:/usr/share/nginx/html nginx:alpine
```
- `-p 80:80` mappe le port `80` de votre machine sur le port `80` du conteneur `Nginx` pour accéder au site Web.
- `-v $(pwd)/lab-volumes-web:/usr/share/nginx/html` monte le dossier `lab-volumes-web` dans le conteneur à l'emplacement `/usr/share/nginx/html`.
- `nginx:alpine` est l'image du conteneur `Nginx` utilisée.

### Étape 3: Vérifier les modifications du site Web

- Ouvrez un navigateur Web et accédez à l'adresse http://localhost:80 pour vérifier que le contenu du site Web a été modifié. Vous devriez voir le texte modifié que vous avez précédemment modifié dans le fichier `index.html`.

### Étape 4: Arrêter et redémarrer le conteneur

- Arrêtez le conteneur `Nginx` avec la commande `docker stop <container-id>`, puis relancez-le avec la commande précédente. Le contenu modifié du site Web doit toujours être visible après le redémarrage.

## Bonus: Utiliser un volume pour MongoDB

- Pour utiliser un volume pour persister les données de `MongoDB`, suivez ces étapes :

Créez un volume Docker nommé `mongo-data` :

```bash
docker volume create mongo-data
```
- Exécutez un conteneur `MongoDB` avec le volume `mongo-data` monté pour stocker les données :

```bash
docker run -d -p 27017:27017 -v mongo-data:/data/db mongo:3.2
```
- Cela exécute un conteneur `MongoDB` en démon (mode détaché) et monte le volume `mongo-data` à l'emplacement `/data/db` dans le conteneur pour stocker les données `MongoDB`.

- Utilisez un autre terminal pour accéder au shell `MongoDB` du conteneur :

```bash
docker exec -it <container-id> mongo
```
- Dans le shell MongoDB, créez une nouvelle base de données, une collection et insérez des données :

```bash
use local
db.createCollection('dogs')
db.dogs.insert({ name: 'hello' })
db.dogs.find()
```
- Cela crée une base de données nommée local, une collection `dogs` et insère un document dans la collection.

- Supprimez le conteneur `MongoDB` en cours d'exécution :

```bash
docker stop <container-id>
```
- Redémarrez le conteneur `MongoDB` en utilisant la même commande que précédemment :

```bash
docker run -d -p 27017:27017 -v mongo-data:/data/db mongo:3.2
```
- Accédez à nouveau au shell MongoDB du conteneur pour vérifier que les données sont toujours présentes :

```bash
docker exec -it <container-id> mongo
use local
db.dogs.find()
```
- Les données doivent être persistantes entre les exécutions de conteneurs `MongoDB`.

- Cet exercice vous montre comment utiliser les volumes `Docker` pour stocker des données de manière persistante, ce qui est essentiel dans de nombreux cas d'utilisation du conteneur `Docker`.