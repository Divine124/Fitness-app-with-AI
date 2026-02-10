# PulseStack — Microservices

A full-stack activity hub with AI-powered recommendations. Log workouts, view your history, and get personalized suggestions—built as a microservices stack with Eureka, Config Server, and an API gateway.

## Architecture

- **Eureka** — Service discovery for all backend services
- **Config Server** — Centralized configuration (Spring Cloud Config)
- **API Gateway** — Single entry point, routing, and Keycloak-based auth
- **User Service** — User registration and profile (PostgreSQL)
- **Activity Service** — Track and query fitness activities (MongoDB, RabbitMQ)
- **AI Service** — Activity-based recommendations using Gemini (MongoDB, RabbitMQ)
- **Frontend** — React (Vite) + Redux, Material UI, OAuth2 PKCE

Frontend talks to the gateway; the gateway syncs users with Keycloak and forwards requests to the appropriate service.

## Tech Stack

| Layer        | Technologies |
|-------------|--------------|
| Frontend    | React 19, Vite, Redux Toolkit, Material UI, Axios, React Router |
| Gateway     | Spring Cloud Gateway, Keycloak integration |
| Backend     | Spring Boot 3, Java 17/23 |
| Data        | PostgreSQL (users), MongoDB (activities, recommendations) |
| Messaging   | RabbitMQ (activity events → AI service) |
| Discovery   | Netflix Eureka |
| Config      | Spring Cloud Config Server |

## Prerequisites

- Java 17+ (some services use 23)
- Node.js 18+
- Maven
- Docker (optional): RabbitMQ, MongoDB, PostgreSQL, Keycloak, or run them locally

## Running the App

1. **Start infrastructure** (RabbitMQ, MongoDB, PostgreSQL, Keycloak) and ensure they are reachable at the URLs defined in each service’s config (or in Config Server properties).

2. **Start backend in order:**
   ```bash
   # 1. Config Server
   cd configserver && ./mvnw spring-boot:run

   # 2. Eureka (in another terminal)
   cd eureka && ./mvnw spring-boot:run

   # 3. User Service, Activity Service, AI Service, Gateway (each in its own terminal)
   cd userservice && ./mvnw spring-boot:run
   cd activityservice && ./mvnw spring-boot:run
   cd aiservice && ./mvnw spring-boot:run
   cd gateway && ./mvnw spring-boot:run
   ```

3. **Start the frontend:**
   ```bash
   cd fitness-app-frontend
   npm install
   npm run dev
   ```

4. Open the app in the browser (e.g. the URL shown by `npm run dev`) and sign in via Keycloak.

## Project Layout

```
├── configserver/     # Central config
├── eureka/           # Service discovery
├── gateway/          # API gateway + auth
├── userservice/      # User management
├── activityservice/  # Activity tracking
├── aiservice/        # AI recommendations
└── fitness-app-frontend/  # React SPA
```

## Configuration

Service-specific settings (databases, RabbitMQ, Keycloak, Eureka, etc.) live in `configserver/src/main/resources/config/` and in each module’s `application.yml`. Point them at your own instances for local or deployed runs.
