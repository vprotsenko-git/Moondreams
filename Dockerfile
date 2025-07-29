# ——— Build Stage ———
FROM node:18-alpine AS builder
WORKDIR /app

# Копіюємо package.json та package-lock.json (npm)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ——— Production Stage ———
FROM nginx:stable-alpine
# Копіюємо конфіг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Копіюємо збірку з попереднього етапу
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]