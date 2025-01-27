# Étape de base
FROM node:20.12.2-alpine3.18 AS base

# Étape des dépendances (deps)
FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN apk update && apk add --no-cache python3 make g++
RUN npm ci

# Étape des dépendances de production (production-deps)
FROM base AS production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN apk update && apk add --no-cache python3 make g++
RUN npm ci

# Étape de build
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Étape de production
FROM base
ENV NODE_ENV=production
WORKDIR /app

# Installer les dépendances système nécessaires pour better-sqlite3
RUN apk update && apk add --no-cache python3 make g++

# Copier les dépendances et le build
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
COPY ./scripts/start.sh /app

# Exposer le port et démarrer l'application
ENV PORT=${PORT}
EXPOSE ${PORT}
# set startpoint for the application
RUN chmod +x start.sh
CMD ["sh", "./start.sh"]