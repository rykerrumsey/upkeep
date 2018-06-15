#### UpKeep
Vehicle maintenance tracker for variety of motor vehicles

Client Todo List
- implement edit form
- implement notifications for response from server
- add options to add form and edit form item
- add a legend for urgency colors
- fix readme
- add tests
- npm scripts for quick run

Server Todo List

## Directory tree

rykerrumsey/upkeep
├── client
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── src
│   │   ├── data
│   │   │   └── didyouknow.json
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
