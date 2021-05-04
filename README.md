```
E-Library 😎
```

<img alt="express-typescript" src="https://geekyants.github.io/express-typescript/public/images/express-typescript.png" height="50%" width="60%">

App specification.

* This app is built using [Express Generator Typescript](https://www.npmjs.com/package/express-generator-typescript) web framework, and is using [Typescript Lang](https://www.typescriptlang.org/) for writing the app's logic. 
* It uses Node's [Cluster API](https://nodejs.org/api/cluster.html), this helps us to take advantage of multi-core systems & to handle the load.
* For Database - Repo contains the use of [Mongoose](https://mongoosejs.com/) (ie. [MongoDB](https://www.mongodb.com/) object modeling for [Node.js](https://nodejs.org/en/)).
* For Routing - Repo contains the use of [express-router](https://expressjs.com/en/guide/routing.html) & have distributed Routes into few files, below routes folder.
* For Route Auth Middleware - Web routes are configured with [Express Jwt](https://www.npmjs.com/package/express-jwt) while the API routes are configured with [JSON Web Token](https://github.com/auth0/express-jwt).
* For views - Repo contains the use of [PUG](https://github.com/pugjs/pug) template engine.

# Contents

* [App Structure](#app-structure)
* [Install, Configure & Run](#install-configure--run)
* [List of Routes](#list-of-routes)

# Global Requisites

* node (>= 12.16.1)
* typescript (>= 4.2.4)
* mongoose (>= 5.12.5)

# App Structure

> _Note: I am mentioning only files/folders which you need to configure if required_

```bash
├── spec
├── src
│   ├── daos
│   │   ├── auth-dao.ts
│   │   ├── book-author-dao.ts
│   │   ├── book-category-dao.ts
│   │   ├── book-dao.ts
│   │   └── user-dao.ts
│   ├── models
│   │   ├── book-author.ts
│   │   ├── book-category.ts
│   │   ├── book.ts
│   │   ├── index.ts
│   │   └── user.ts
│   ├── pre-start
│   │   ├── env
│   │   │   ├── development.env
│   │   │   ├── production.env
│   │   │   └── qa.env
│   │   └── index.ts
│   ├── public
│   ├── routes
│   │   ├── auth.ts
│   │   ├── book-author.ts
│   │   ├── book-category.ts
│   │   ├── book.ts
│   │   ├── index.ts
│   │   └── users.ts
│   ├── shared
│   │   ├── constants.ts
│   │   ├── functions.ts
│   │   ├── Logger.ts
│   │   └── types.d.ts
│   ├── views
│   │   └── index.html
│   ├── index.ts
│   └── Server.ts
├── build.ts
├── .gitignore
├── jet-logger.log
├── package-lock.json
├── README.md
├── tsconfig.json
└── tsconfig.prod.json
```

# Install, Configure & Run

Below mentioned are the steps to install, configure & run in your platform/distributions.

```bash
# Clone the repo.
git clone https://github.com/Isurumw/E-Library.git

# Goto the cloned project folder.
cd  E-Library;
```

```bash
# Without Docker

# Note: It is preassumed here that you have mongoose running in background & you have created the database.

# Install NPM dependencies.
npm install;

# Run the app
npm run start:dev;
```


# List of Routes

```sh
# Web Routes:

+--------+-------------------------+
  Method | URI
+--------+-------------------------+
  GET    | /
  POST   | /signin
  POST   | /signup
  GET    | /books
  POST   | /books
  PUT    | /books
  DELETE | /books
  GET    | /books/categories
  POST   | /books/categories
  PUT    | /books/categories
  DELETE | /books/categories
  GET    | /books/authors
  POST   | /books/authors
  PUT    | /books/authors
  DELETE | /books/authors
+--------+-------------------------+

```