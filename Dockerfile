FROM node:18 AS builder
WORKDIR /app

 # Копіюємо залежності
COPY package.json .
RUN npm install

 # Копіюємо код
COPY public public
COPY src src
COPY vite.config.js .


# Збираємо фронтенд з кореня: Vite у конфігурації шукає public/index.html
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]