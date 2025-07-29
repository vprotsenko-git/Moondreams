# ——— Build Stage ———
FROM node:18-alpine AS builder
WORKDIR /app

# Копіюємо тільки package.json; lock-файлів у тебе немає, тому їх не чіпаємо
COPY package.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код і збираємо фронтенд
COPY . .
RUN npm run build

# ——— Production Stage ———
FROM nginx:stable-alpine
# Копіюємо власний nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Копіюємо результати збірки
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]