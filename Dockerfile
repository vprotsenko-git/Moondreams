# ---- Stage 1: Build the app ----
FROM node:18 AS builder

WORKDIR /app
# Копіюємо тільки package.json та ставимо залежності
COPY package.json ./
RUN npm install      

# Копіюємо весь код і будуємо production-збірку
COPY . .
RUN npm run build

# ---- Stage 2: Serve with Nginx ----
FROM nginx:stable-alpine

# Видаляємо дефолтну конфігурацію, додаємо свою
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# Відкриваємо HTTP-порт
EXPOSE 80

# Запускаємо Nginx у форграунд-режимі
CMD ["nginx", "-g", "daemon off;"]