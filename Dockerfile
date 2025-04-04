# Étape 1 : Build de l'application
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Étape 2 : Image de production
FROM node:22-slim
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD ["node", "server.js"]
