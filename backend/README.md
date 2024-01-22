# 4IT580: Backend

## Overview

This document outlines the structure, dependencies, and setup procedures for the backend application.

## Requirements

- **Node.js**: [Node.js](https://nodejs.org/) version `20.11.0` or above.
- **Package Manager**: [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (recommended version `3.6.4`).
- **Database**: [MySQL](https://www.mysql.com/) compatible with MariaDB driver version `3.2.0`.
- **Other Dependencies**: The project may require additional system dependencies depending on your operating system.


## Setup ENV Variables

```
cp ./.env.example ./.env
```

Edit `.env` file (DB user, password, ...).

Local environment file can be found on team server.

## Key dependencies

- `@apollo/server`: Core engine for Apollo GraphQL server.
- `@googlemaps/google-maps-services-js`: Node.js client library for Google Maps API Web Services.
- `nodemailer` - Email sending library.
- `handlebars` - Template system. Used for emails.
- `knex` - SQL query builder.

## Install Dependencies

```bash
yarn install
```

## `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.


## Run Production

```bash
yarn start
```

## Build Production

```bash
yarn build
```

### Build Production and Watch for Changes

```bash
yarn build-watch
```

## File Structure

The application is organized as follows:

### Root directory
- `node_modules`: Dependencies and libraries.
- `src`: Main source code
- `scripts`: Scripts for automation.

Within `src` there are three key subdirectories:
### `datasource`

Contains all logic related to data layer.

### `graphql`

Contains all business logic related to GraphQL resolvers and types.

### `emails`

Contains email system and templates for creating and sending server-side emails.
