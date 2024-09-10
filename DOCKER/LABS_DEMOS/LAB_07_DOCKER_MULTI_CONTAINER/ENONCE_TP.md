# LAB - CRÉATION D'UNE APPLICATION MULTICONTENEUR

## Articuler deux images avec Docker compose

### identidock : une application Flask qui se connecte à redis

- Démarrez un nouveau projet dans `VSCode` (créez un dossier appelé `identidock` et chargez-le avec la fonction Add folder to workspace)

- Dans un sous-dossier app, ajoutez une petite application python en créant ce fichier `identidock.py` :

```python

from flask import Flask, Response, request
import requests
import hashlib
import redis

app = Flask(__name__)
cache = redis.StrictRedis(host='redis', port=6379, db=0)
salt = "UNIQUE_SALT"
default_name = 'Joe Bloggs'

@app.route('/', methods=['GET', 'POST'])
def mainpage():

    name = default_name
    if request.method == 'POST':
        name = request.form['name']

    salted_name = salt + name
    name_hash = hashlib.sha256(salted_name.encode()).hexdigest()
    header = '<html><head><title>Identidock</title></head><body>'
    body = '''<form method="POST">
                Hello <input type="text" name="name" value="{0}">
                <input type="submit" value="submit">
                </form>
                <p>You look like a:
                <img src="/monster/{1}"/>
            '''.format(name, name_hash)
    footer = '</body></html>'
    return header + body + footer


@app.route('/monster/<name>')
def get_identicon(name):

    image = cache.get(name)

    if image is None:
        print ("Cache miss", flush=True)
        r = requests.get('http://dnmonster:8080/monster/' + name + '?size=80')
        image = r.content
    cache.set(name, image)

    return Response(image, mimetype='image/png')

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=9090)

```

- `uWSGI` est un serveur python de production très adapté pour servir notre serveur intégré Flask, nous allons l’utiliser.

- Dockerisons maintenant cette nouvelle application avec le Dockerfile suivant :

```Dockerfile

FROM python:3.7

RUN groupadd -r uwsgi && useradd -r -g uwsgi uwsgi
RUN pip install Flask uWSGI requests redis
WORKDIR /app
COPY app/identidock.py /app

EXPOSE 9090 9191
USER uwsgi
CMD ["uwsgi", "--http", "0.0.0.0:9090", "--wsgi-file", "/app/identidock.py", \
"--callable", "app", "--stats", "0.0.0.0:9191"]

```

- Observons le code du Dockerfile ensemble s’il n’est pas clair pour vous. Juste avant de lancer l’application, nous avons changé d’utilisateur avec l’instruction `USER`, pourquoi ?.

- Construire l’application, pour l’instant avec `docker build`, la lancer et vérifier avec `docker exec`, `whoami` et `id` l’utilisateur avec lequel tourne le conteneur.

#### Réponse 

```bash

docker build -t identidock .
docker run --detach --name identidock -p 9090:9090 identidock
docker exec -it identidock /bin/bash

```

- Une fois dans le conteneur lancez:
 
  - `whoami` et `id`
  - vérifiez aussi avec `ps aux` que le serveur est bien lancé.

### Le fichier Docker Compose

- A la racine de notre projet `identidock` (à côté du `Dockerfile`), créez un fichier de déclaration de notre application appelé `docker-compose.yml` avec à l’intérieur :

```yaml

version: "3.7"
services:
  identidock:
    build: .
    ports:
      - "9090:9090"

```

- Plusieurs remarques :

  - la première ligne après `services` déclare le conteneur de notre application
  - les lignes suivantes permettent de décrire comment lancer notre conteneur
  - `build : .` indique que l’image d’origine de notre conteneur est le résultat de la construction d’une image à partir du répertoire courant (équivaut à `docker build -t identidock .`)

 - la ligne suivante décrit le mapping de ports entre l’extérieur du conteneur et l’intérieur.

- Lancez le service (pour le moment mono-conteneur) avec `docker-compose up` (cette commande sous-entend `docker-compose build`)

- Visitez la page web de l’app.

Ajoutons maintenant un deuxième conteneur. Nous allons tirer parti d’une image déjà créée qui permet de récupérer une “identicon”. Ajoutez à la suite du fichier Compose (attention aux indentations !) :

```yaml

dnmonster:
  image: amouat/dnmonster:1.0

```

Le docker-compose.yml doit pour l’instant ressembler à ça :

```yaml

version: "3.7"
services:
  identidock:
    build: .
    ports:
      - "9090:9090"

  dnmonster:
    image: amouat/dnmonster:1.0

```

Enfin, nous déclarons aussi un réseau appelé `identinet` pour y mettre les deux conteneurs de notre application.

- Il faut déclarer ce réseau à la fin du fichier (notez que l’on doit spécifier le driver réseau) :

```yaml

networks:
  identinet:
    driver: bridge

```
- Il faut aussi mettre nos deux services `identidock` et `dnmonster` sur le même réseau en ajoutant deux fois ce bout de code où c’est nécessaire (attention aux indentations !) :

```yaml

networks:
  - identinet

```

- Ajoutons également un conteneur `redis` (attention aux indentations !). Cette base de données sert à mettre en cache les images et à ne pas les recalculer à chaque fois.


```yaml

redis:
  image: redis
  networks:
    - identinet

```

`docker-compose.yml` final :

```yaml

version: "3.7"
services:
  identidock:
    build: .
    ports:
      - "9090:9090"
    networks:
      - identinet

  dnmonster:
    image: amouat/dnmonster:1.0
    networks:
      - identinet

  redis:
    image: redis
    networks:
      - identinet

networks:
  identinet:
    driver: bridge


```

- Lancez l’application et vérifiez que le cache fonctionne en chercheant les `cache miss` dans les logs de l’application.

- N’hésitez pas à passer du temps à explorer les options et commandes de `docker-compose`, ainsi que [la documentation officielle du langage des Compose files](https://docs.docker.com/compose/compose-file/). Cette documentation indique aussi les différences entre la version 2 et la version 3 des fichiers Docker Compose.


### D’autres services

#### Exercice de google-fu : un pad CodiMD

- Récupérez (et adaptez si besoin) à partir d’Internet un fichier `docker-compose.yml` permettant de lancer un pad `CodiMD` avec sa base de données. Je vous conseille de toujours chercher dans la documentation officielle ou le repository officiel (souvent sur `Github`) en premier. Attention, `CodiMD` avant s’appelait `HackMD`.

- Vérifiez que le `pad` est bien accessible sur le port donné.

#### Une stack Elastic

#### Centraliser les logs

L’utilité d’`Elasticsearch` est que, grâce à une configuration très simple de son module `Filebeat`, nous allons pouvoir centraliser les logs de tous nos conteneurs `Docker`. Pour ce faire, il suffit d’abord de télécharger une configuration de `Filebeat` prévue à cet effet :

```bash

Invoke-WebRequest -Uri "https://raw.githubusercontent.com/elastic/beats/7.10/deploy/docker/filebeat.docker.yml" -OutFile "filebeat.docker.yml"


```
Renommons cette configuration et rectifions qui possède ce fichier pour satisfaire une contrainte de sécurité de `Filebeat` :

```bash

Rename-Item -Path .\filebeat.docker.yml -NewName "filebeat.yml"
icacls .\filebeat.yml /grant "BUILTIN\Administrators:(F)"

```

Enfin, créons un fichier `docker-compose.yml` pour lancer une stack `Elasticsearch` :

```yaml

version: "3"

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.5.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    networks:
      - logging-network

  filebeat:
    image: docker.elastic.co/beats/filebeat:7.5.0
    user: root
    depends_on:
      - elasticsearch
    volumes:
      - ./filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - logging-network
    environment:
      - -strict.perms=false

  kibana:
    image: docker.elastic.co/kibana/kibana:7.5.0
    depends_on:
      - elasticsearch
    ports:
      - 5601:5601
    networks:
      - logging-network

networks:
  logging-network:
    driver: bridge


```

Il suffit ensuite de se rendre sur `Kibana` (port `5601`) et de configurer l’index en tapant `*` dans le champ indiqué, de valider et de sélectionner le champ `@timestamp`, puis de valider. L’index nécessaire à `Kibana` est créé, vous pouvez vous rendre dans la partie `Discover` à gauche (l’icône boussole 🧭) pour lire vos logs.



