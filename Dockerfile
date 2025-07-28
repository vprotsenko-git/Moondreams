 FROM node:18 AS builder
 WORKDIR /app

 # Копіюємо залежності
 COPY package.json .
 RUN npm install

 # Копіюємо код
 COPY public public
 COPY src src
 COPY vite.config.js .

-# Якщо прописувати тут WORKDIR, npm не знайде package.json
-# WORKDIR /app/public

-# RUN npm run build з /app/public видає ENOENT на package.json
-# тому просто запускаємо збірку з кореня
-RUN npm run build
+#
+# Збираємо фронтенд з кореня: Vite у конфігурації шукає public/index.html
+RUN npm run build

 FROM nginx:stable-alpine
 COPY --from=builder /app/dist /usr/share/nginx/html
 EXPOSE 80
 CMD ["nginx", "-g", "daemon off;"]