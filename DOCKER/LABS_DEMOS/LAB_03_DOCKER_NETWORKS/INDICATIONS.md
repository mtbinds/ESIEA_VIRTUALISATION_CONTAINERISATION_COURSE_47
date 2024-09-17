# Indications pour le LAB

Pour réaliser ce LAB de configuration de deux conteneurs Docker (MongoDB et Mongo-Express) avec des contraintes spécifiques, suivez ces étapes :

- Créez un réseau Docker :

```bash
docker network create lab-docker-network
```
- Créer un volume Docker :

```bash
docker volume create lab-docker-mongo-data
```

- Configurez le conteneur `MongoDB` (`lab-docker-mongo`) en utilisant l'image `mongo` avec un volume pour persister les données, un utilisateur et un mot de passe spécifiques. Exécutez la commande suivante :

```bash 
docker run -d --name lab-docker-mongo --network lab-docker-network -v lab-docker-mongo-data:/data/db -e MONGO_INITDB_ROOT_USERNAME=lab-docker -e MONGO_INITDB_ROOT_PASSWORD=lab-docker-password mongo
```

- Configurez le conteneur `Mongo-Express` (`lab-docker-mongo-express`) en utilisant l'image `mongo-express`, en lui donnant accès au réseau et à la base de données `MongoDB` du premier conteneur. Assurez-vous de configurer l'utilisateur et le mot de passe comme requis. Exécutez la commande suivante :

```bash
docker run -d --name lab-docker-mongo-express --network lab-docker-network -e ME_CONFIG_MONGODB_SERVER=lab-docker-mongo -e ME_CONFIG_MONGODB_ADMINUSERNAME=lab-docker -e ME_CONFIG_MONGODB_ADMINPASSWORD=lab-docker-password -p 8080:8081 mongo-express
```
**NB** : Si vous aurez une erreur, essayer d'utiliser le nom d'utilisateur par défaut ('admin') et le mot de passe ('pass').

- Accédez à l'interface `Mongo-Express` depuis un navigateur en ouvrant http://localhost:8080. Vous devriez voir l'interface de gestion de la base de données `MongoDB`.

- Vous pouvez vérifier que les volumes fonctionnent en créant une base de données via l'interface Mongo-Express, puis en supprimant le conteneur `MongoDB` (`lab-docker-mongo`) et en le recréant avec la même commande que précédemment. Lorsque vous ouvrez à nouveau l'interface `Mongo-Express`, la base de données que vous avez créée précédemment devrait être présente, ce qui démontre que les données persistent correctement.

Cet exercice devrait vous permettre de configurer et faire communiquer ces deux conteneurs `Docker` selon les contraintes spécifiées.




