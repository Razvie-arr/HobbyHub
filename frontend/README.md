# HobbyHub Frontend Application Structure

## Overview

This document outlines the structure, dependencies, and setup procedures for the frontend application.

## System Requirements

To ensure smooth setup and development of this project, please use the following for JavaScript runtime and package manager:

- `Node.js`: Ensure that your system has Node.js version 16 or later installed.
- `Yarn`: This project utilizes Yarn as its package manager. Specifically, Yarn version 3.6.4 is used, as indicated in the project configurations.

## File Structure

The application is organized as follows:

### Root directory

- `bin`: Command-line executable scripts.
- `build`: Compiled or bundled application code.
- `node_modules`: Dependencies and libraries.
- `public`: Static files such as HTML, images, and fonts.
- `src`: Main source code

Within `src` there are two key subdirectories:

### `modules`

Subdirectory containing logic for different domains of the application. Each folder in the `modules` directory has further subdirectories and files:

- `modules`: Feature-specific directories:
  - `auth`: Authentication logic.
  - `block`: User/action blocking features.
  - `events`: Event management components.
  - `groups`: Group-related functionalities.
  - `landing`: Landing page components.
  - `messages`: Messaging system.
  - `profile`: User profile management.
  - `reviews`: Review and feedback system.

#### Subdirectories

- `components`: Contains reusable UI components specific to event-related features, such as event cards, lists, or detailed views.
- `forms`: Holds the form-related components and logic for event operations, like creating or editing events.
- `pages`: Includes the page components that correspond to complete views or screens for event-related routes within the application.
- `schemas`: Contains data validation or structure schemas that define the shape of event data, ensuring consistency and validity of event information throughout the application.

#### Files

- `index.ts`: The entry point for the module that exports the necessary components, utilities, and types to be used by other parts of the application.
- `mutations.ts`: Includes GraphQL mutation operations or similar functions for creating, updating, or deleting event data.
- `queries.ts`: Contains GraphQL query operations or equivalent data fetching functions that retrieve event-related data.
- `types.ts`: Defines TypeScript types and interfaces for event-related data, ensuring type safety and consistency across the frontend application.

This structure is designed to modularize the frontend code, making it more maintainable and scalable. Each directory and file has a specific role, ensuring separation of concerns and easier navigation for developers.

### `shared`

Subdirectory containing reusable code

- `shared`: Reusable code:
  - `constants`: Constants for app-wide use.
  - `design-system`: UI design components.
  - `filters`: Data filtering functions.
  - `forms`: Shared form components/hooks.
  - `hooks`: Reusable custom React hooks.
  - `layout`: Application layout components.
  - `navigation`: Navigation components/utilities.
  - `renderers`: UI element rendering.
  - `schemas`: Data structure definitions.
  - `types`: TypeScript type definitions.
  - `theme`: Styling/theming definitions.
  - `utils`: Utility functions.

### Key files

Below is a description of key files in the project directory, outlining their purpose within the application.

- `.env`

  - A file that stores environment variables which are critical for keeping secrets out of the codebase and for configuring the application based on the environment it is running in.

- `.eslintrc.js`

  - Configuration file for ESLint, a tool for identifying and reporting on patterns in JavaScript, which helps in keeping the code clean and consistent.

- `.gitignore`

  - Specifies intentionally untracked files that Git should ignore, such as build artifacts and local configuration files that should not be committed to the repository.

- `.nvmrc`

  - This file allows Node Version Manager (NVM) to automatically determine the version of Node.js to use, ensuring that all contributors are using the same version.

- `vite-entry.js`

  - The initial entry point for the Vite bundler, configuring how the application will be bundled for development or production.

- `schema.graphql`

  - Defines the GraphQL schema, which is a model of the data that can be queried and manipulated through GraphQL requests.

- `index.html`

  - The main HTML document of the application, which is typically the entry point for web applications and where the bundled JavaScript files are included.

- `jsconfig.json`

  - Provides the JavaScript language services with project-specific information about the base level JavaScript settings, and helps with features like code navigation and IntelliSense.

- `package.json`

  - Contains metadata relevant to the project and it is used for managing the project's dependencies, scripts, and versions.

- `tsconfig.json`

  - Configuration file for TypeScript, defining options for the TypeScript compiler to ensure consistent compiling of TypeScript to JavaScript across different environments.

- `tsconfig.node.json`

  - A specific TypeScript configuration file for Node.js environment settings, which may differ from the configuration used for the client-side code.

- `yarn.lock`

  - Automatically generated file which ensures that the same version of each dependency is used every time the project is installed, thereby ensuring consistency across installations.

- `README.md`

  - A markdown file that provides information about the project, including setup, usage, and contribution guidelines.

- `codegen.ts`

  - Typically used for generating code based on certain inputs; in the context of a project, it might relate to generating TypeScript types from the GraphQL schema.

- `vite.config.ts`
  - The configuration file for Vite, a modern frontend build tool, which specifies how the application is built, served, and optimized.

## Dependencies

**UI Frameworks and Styling:**

- `@chakra-ui/react`: UI component library.
- `@emotion/react`: CSS-in-JS library.
- `@fontsource/roboto`: Roboto font for self-hosting.
- `framer-motion`: Animation library.

**Form Handling:**

- `@hookform/resolvers`: Validation resolvers for `react-hook-form`.
- `react-hook-form`: Library for building forms.

**GraphQL and Data Management:**

- `@apollo/client`: GraphQL client for data management.
- `apollo-upload-client`: Supports file uploads to GraphQL server.
- `graphql`: GraphQL query parser.
- `graphql-tag`: GraphQL query builder.

**Routing:**

- `react-router-dom`: Routing library for React.

**Utilities and Helpers:**

- `query-string`: URL query string parser.
- `ts-pattern`: Pattern matching for TypeScript.
- `zod`: Data validation schema library.

**Development Tools:**

- `eslint`: Code linting utility.
- `prettier`: Code formatting tool.
- `typescript`: JavaScript superset with static typing.
- `vite`: Frontend build tool.

**Testing:**

- `vitest`: Testing framework for Vite-based projects.

## Setup and Scripts

Initialize the project and manage tasks with the following scripts:

- `yarn install`: Install all dependencies.
- `yarn dev`: Start the development server.
- `yarn build`: Compile the code for production.
- `yarn test`: Execute the test suite.
- `yarn prettier`: Run Prettier to format the code.
- `yarn lint`: Use ESLint to check for issues.
- `yarn lint:fix`: Fix linting issues automatically.
- `yarn download-schema`: Fetch the latest GraphQL schema.
- `yarn graphql`: Generate typings from the GraphQL schema.
- `yarn preview`: Preview the production build locally.

