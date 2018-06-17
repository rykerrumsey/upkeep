# UpKeep
Vehicle maintenance tracker for variety of motor vehicles

## Tools you will need to install prior

* [Docker](https://www.docker.com/community-edition#/download)
* [Docker-Compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/en/download/)

## Client todo list

* implement edit modal
* implement notifications for response from server
* add client side form validation
* add options to add form and edit form modal
* add a legend for urgency colors
* ~~fix readme~~
* add tests
* ~~npm scripts for quick run~~

## Server todo list

* add form validation
* implement edit car function
* make index.php handle server requests better... [Laravel](https://laravel.com/)
* add more options for different cars
* test database calls
* add seed data for test database

## Directory tree

```sh
rykerrumsey/upkeep
├── client
│   ├── dist
│   │   ├── bundle.js
│   │   ├── index.html
│   │   └── main.css
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── src
│   │   ├── index.html
│   │   ├── index.js
│   │   ├── js
│   │   │   ├── addControl.js
│   │   │   ├── displayControl.js
│   │   │   ├── grid.js
│   │   │   ├── icons.js
│   │   │   ├── modal.js
│   │   │   ├── requests.js
│   │   │   └── utils.js
│   │   └── scss
│   │       └── main.scss
│   ├── webpack.config.js
│   └── yarn.lock
├── LICENSE
├── README.md
└── server
    ├── bin
    │   └── linux
    │       └── clean.sh
    ├── docker-compose.yml
    ├── dockerfile
    ├── etc
    │   └── nginx
    │       ├── default.conf
    │       └── options.bak
    ├── init
    │   ├── init-test-db.js
    │   └── init-upkeep-db.js
    ├── README.md
    └── web
        ├── app
        │   ├── composer.json
        │   ├── composer.lock
        │   ├── phpunit.xml.dist
        │   ├── src
        │   │   ├── Car.php
        │   │   ├── CarView.php
        │   │   ├── Db.php
        │   │   ├── Fuel.php
        │   │   └── Vehicle.php
        │   └── test
        │       ├── bootstrap.php
        │       └── CarTest.php
        └── public
            └── index.php
```
