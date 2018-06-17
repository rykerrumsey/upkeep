# UpKeep client side deploy instructions

Client side car managment app built using pure javascript as the ui. Webpack is being used for automated builds.

**THIS ENVIRONMENT SHOULD ONLY BE USED FOR DEVELOPMENT!**

**DO NOT USE IT IN PRODUCTION!**

## Start using it

1. Download it :

    ```sh
    $ git clone https://github.com/rykerrumsey/upkeep.git
    ```

2. Follow the instructions in the **server/README.md** and get the server running first.

3. In the client directory start the client by using:

    ```sh
    $ npm install
    $ npm start
    ```

## Start developing on the project

1. Run webpack in watch mode and lite-server to display **./dist/**:

    ```sh
    $ npm run dev
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
