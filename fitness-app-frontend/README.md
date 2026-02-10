# Fitness App — Frontend

React single-page application for the fitness tracking platform. Handles login via Keycloak (OAuth2 PKCE), activity listing and creation, and AI-backed recommendations.

## Stack

- **React 19** + **Vite** — Build and dev server
- **Redux Toolkit** — Client state and API caching
- **Material UI (MUI)** — Components and theming
- **React Router** — In-app navigation
- **Axios** — HTTP client to the API gateway
- **react-oauth2-code-pkce** — Keycloak login flow

## Scripts

| Command      | Description              |
|-------------|--------------------------|
| `npm run dev`     | Start dev server (Vite)  |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Setup

1. Install dependencies: `npm install`
2. Ensure the API gateway and Keycloak URLs in `src/authConfig.js` (and any env or config) match your backend.
3. Run `npm run dev` and open the URL shown in the terminal.

The app assumes the gateway is running and Keycloak is configured for the same origin or allowed redirect URIs.
