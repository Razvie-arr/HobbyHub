# [4IT580: Agilní vývoj webových aplikací](http://4it580.vse.cz/) na [VŠE](https://www.vse.cz/)

## [📖 4IT580: Docs](https://vse-4it580-docs-2023.vercel.app)

## JavaScript

We will be using [Node.js](https://nodejs.org/). Please see [`.nvmrc`](./.nvmrc) to find current node.js version we are using.
New JavaScript features (ES2015+) are "enabled" for all modern browsers with [Babel](https://babeljs.io/).

### Reference

- [JavaScript reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [Learn ES2015](https://babeljs.io/docs/en/learn) + more:
  - [object rest spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/)
- [TypeScript docs](https://www.typescriptlang.org/docs/)

### Literature

- **[React docs](https://react.dev/learn)**
- frontend app is created using [`Vite`](https://vitejs.dev/)
- books:
  - [You Don't Know JS (book series)](https://github.com/getify/You-Dont-Know-JS/tree/1st-ed)
    - [Up & Going](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/up%20%26%20going/README.md)
    - [Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/scope%20%26%20closures/README.md)
    - [ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/es6%20%26%20beyond/README.md)
  - [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do)

### JavaScript Packages

- [yarn CLI docs](https://yarnpkg.com/en/docs/cli/)
- Useful commands:
  - `yarn install` (install local dependencies - based on `package.json` and `yarn.lock` files)
  - `yarn add <package-name>` (install new NPM package and add it as a dependency to `package.json`)
  - `yarn <script-name>` (eg. `yarn start`, `yarn prettier`, see `"scripts"` section in `package.json`)
- Search for packages:
  - [npmjs.com](https://www.npmjs.com/)
  - **[js.coach/react](https://js.coach/react)**

## Server Setup

## SSH

- `ssh team01@vse.handson.pro`
- frontend code: `cd ~/code/cviceni/frontend`

### Domains

- [frontend-**team01**-vse.handson.pro](http://frontend-team01-vse.handson.pro)

## System Requirements

Before setting up the project, ensure you have the following installed:

### For BE:

- **Node.js**: [Node.js](https://nodejs.org/) version `20.11.0` or above.
- **Package Manager**: [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (recommended version `3.6.4`).
- **Database**: [MySQL](https://www.mysql.com/) compatible with MariaDB driver version `3.2.0`.
- **Knex**: [Knex](https://knexjs.org/) version `3.0.1`.
- **Nodemailer**: [NodeMailer](https://nodemailer.com/) (version `6.4.13` recommended).
- **Google Maps API**: //TODO
- **Other Dependencies**: The project may require additional system dependencies depending on your operating system.

## Knex setup

- Knex is a SQL query builder compatible with MySQL and MariaDB.
- For step-by-step setup guide, please refer to this [manual](https://knexjs.org/guide/)

## Nodemailer setup

- The app uses Nodemailer with [Brevo relay](https://developers.brevo.com/) for email functionality. Ensure the correct
  settings are configured in the .env or .env.local file as seen in our .env dummy file.
- Add nodemailer via `npm install nodemailer` or `yarn add nodemailer`
- Create your account at [Brevo](https://onboarding.brevo.com/account/register) and generate an SMTP key
- Fill your credentials and SMTP key as
  shown [here](https://developers.brevo.com/docs/node-smtp-relay-example#declare-your-stmp-credentials)
- To send emails, just simply build your content as a simple String or HTML and trigger it in code as
  shown [here](https://developers.brevo.com/docs/node-smtp-relay-example#compose-your-email-object)

## Google Maps API

//TODO
