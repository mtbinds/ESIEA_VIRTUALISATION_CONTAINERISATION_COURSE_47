# DOCKERISATION D'UNE APPLICATION (SPRING BOOT, ANGULAR et MYSQL)

## Exécutez l'application Spring Boot

```bash

mvn spring-boot:run -DskipTests

```
Le serveur Spring Boot exportera l'API au port `8081`.

## Exécutez le client Angular

```bash

npm install
ng serve --port 8081

```
## Instructions

- Ajoutez les fichiers `Dockerfile` correspondant au **Frontend** et au **Backend**.

- Ajoutez le fichier `docker-compose.yml` et utilisez les fichiers `Dockerfile` pour déployer l'application en local avec `docker compose`.

## Tutoriel

https://developer.okta.com/blog/2020/06/17/angular-docker-spring-boot

