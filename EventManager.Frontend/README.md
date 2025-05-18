# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

---

## Running with Docker

This project includes a Docker setup for building and running the React + TypeScript + Vite app in a containerized environment.

- **Node.js version:** The Dockerfile uses `node:22.13.1-slim` for both build and production stages.
- **Ports:** The app exposes port **5173** (the default Vite preview port). This is mapped to your host in the Docker Compose file.
- **Environment variables:**
  - You can use either `.env.development` or `.env.production` files for environment-specific configuration. Uncomment the relevant `env_file` line in `docker-compose.yml` to enable this.
- **No external dependencies:** The current Docker Compose setup only runs the frontend app. If you add a backend or database, update the compose file accordingly.

### Build and Run

To build and start the app using Docker Compose:

```sh
docker compose up --build
```

This will:
- Build the Docker image for the frontend app
- Start the container and expose the app at [http://localhost:5173](http://localhost:5173)

### Customization
- To use custom environment variables, edit `.env.development` or `.env.production` and uncomment the corresponding `env_file` line in `docker-compose.yml`.
- The app runs as a non-root user inside the container for improved security.

---
