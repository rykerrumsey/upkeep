# UpKeep client side deploy instructions

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

2. Run :

    ```sh
    $ docker-compose up
    ```
    In the server directory of upkeep.
## Directory tree

```sh
docker-nginx-php-mongo
├── docker-compose.yml
├── dockerfile
├── README.md
├── bin
│   └── linux
│       └── clean.sh
├── data
│   └── db
│       ├── dumps
│       └── mongo
├── etc
│   ├── nginx
│   │   └── default.conf
│   ├── php
│       └── php.ini
└── web
    ├── app
    │   ├── composer.json
    │   ├── phpunit.xml.dist
    │   ├── src
    │   │   └── Foo.php
    │   └── test
    │       ├── FooTest.php
    │       └── bootstrap.php
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
