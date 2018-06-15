# UpKeep server and database deploy instructions

Based on this [repo](https://github.com/nanoninja/docker-nginx-php-mongo)

**THIS ENVIRONMENT SHOULD ONLY BE USED FOR DEVELOPMENT!**

**DO NOT USE IT IN PRODUCTION!**

## Images to use

* [Nginx](https://hub.docker.com/_/nginx/)
* [Mongo](https://hub.docker.com/_/mongo/)
* [PHP-FPM](https://hub.docker.com/r/rykerrumsey/php-fpm/)
* [Composer](https://hub.docker.com/_/composer/)

## Start using it

1. Download it :

    ```sh
    $ git clone https://github.com/rykerrumsey/upkeep.git
    ```

2. In the server directory of upkeep. Run :

    ```sh
    $ docker-compose up
    ```
## Running tests

1. From project directory change into app :

    ```sh
    $ cd ./server/web/app.
    ```
2. Inside app directory run test suite by :

    ```sh
    $ ./vendor/bin/phpunit
    ```

## Directory tree

```sh
server
├── bin
│   └── linux
│       └── clean.sh
├── docker-compose.yml
├── dockerfile
├── etc
│   └── nginx
│       ├── default.conf
│       └── options.bak
├── README.md
└── web
    ├── app
    │   ├── composer.json
    │   ├── composer.lock
    │   ├── phpunit.xml.dist
    │   └── src
    │       ├── Car.php
    │       ├── CarView.php
    │       ├── Db.php
    │       ├── Interfaces.php
    │       └── Vehicle.php
    └── public
        └── index.php
```

## Connecting to mongo
```sh
docker exec -it mongo bash
```

## Creating database exports

```sh
mongoexport --port 27020 --db test --collection mycollection --out $(pwd)/data/db/dumps/mycollection.json
```

## Creating database dumps

```sh
mongodump --port 27020 --db test --collection mycollection --out $(pwd)/data/db/dumps
```

## Cleaning project

**Warning**: Clears all containers and volumes.

```sh
$ ./bin/linux/clean.sh $(pwd)
```
