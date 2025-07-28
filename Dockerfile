FROM node:18 AS builder
WORKDIR /app

# 1) Встановлюємо залежності
COPY package.json ./
RUN npm install

# 2) Копіюємо ВСЮ структуру репо у /app (включно з index.html)
COPY . .

# 3) Збираємо фронтенд
RUN npm run build

# ===== далі стадія з nginx без змін =====
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]