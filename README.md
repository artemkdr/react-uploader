# Uploader component showcase

This simple application shows reusable [FileUploader](/src/client/components/file-uploader/index.tsx), [ProgressBar](/src/client/components/progress-bar/index.tsx) and [FileList](/src/client/components/file-list/index.tsx) React components with the following functionality:
- allows uploading and listing existing files through an existing Http API (express server in `src/server` folder),
- designed to be easily extended,
- shows the list of uploaded files

## Styling

Tailwind CSS is used for styling.

## How to run

To run this project, follow these steps:

1. **Install dependencies**:
    ```sh
    npm install
    ```

2. **Run the development server**:
    ```sh
    npm run dev
    ```
    This will start the Express server and Vite development server. The Express server is defined in [server/main.ts](/src/server/main.ts) and serves the API endpoints for file uploads and listing files.

You can also build it for production and run in production environment:

1. **Build the project**:
    ```sh
    npm run build
    ```
    This will create a production build of the client-side code using Vite.

2. **Start the production server**:
    ```sh
    npm start
    ```
    This will start the Express server in production mode, serving the built client-side code.

## Linting, typechecking and testing:

**Lint the code**:

    ```sh
    npm run lint
    ```
    This will run ESLint to check for code quality issues.
    ```sh
    npm run lint:fix
    ```
    This will run ESLint to check for code quality issues and format the code with prettier.

**Typecheck the code**:

    ```sh
    npm run typecheck
    ```
    This will run TypeScript to check for type errors.

**Run tests**:

- **Server tests**:

    ```sh
    npm run test:server
    ```
    This will run the end-to-end tests for the server-side code.
- **Client tests**:

    ```sh
    npm run test:client
    ```
    This will run the tests for the client-side code using Vitest.

---
