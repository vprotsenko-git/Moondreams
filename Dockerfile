# === Stage 1: dependencies install ===
FROM node:18 AS deps
WORKDIR /app
COPY package.json .
RUN npm install

# === Stage 2: build ===
FROM node:18 AS builder
WORKDIR /app
# Копіюємо тільки те, що потрібно для збірки
COPY --from=deps /app/node_modules ./node_modules
COPY public public
COPY src src
COPY vite.config.js .
# Будуємо — Vite прочитає public/index.html та src/index.jsx
WORKDIR /app/public
RUN npm run build

# === Stage 3: production image ===
FROM nginx:stable-alpine
# Копіюємо згенеровану збірку з /app/dist
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]