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

## Directory tree

```sh
client
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── data
│   │   └── didyouknow.json
│   ├── index.html
│   ├── index.js
│   ├── js
│   │   ├── addControl.js
│   │   ├── displayControl.js
│   │   ├── grid.js
│   │   ├── icons.js
│   │   ├── modal.js
│   │   ├── requests.js
│   │   └── utils.js
│   └── scss
│       └── main.scss
├── webpack.config.js
└── yarn.lock
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
