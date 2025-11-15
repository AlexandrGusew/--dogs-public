# Этап 1: Сборка приложения
FROM node:18-alpine AS build

WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем production build
# VITE_API_URL будет передан через ARG при сборке
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Этап 2: Production образ с nginx
FROM nginx:alpine

# Копируем собранное приложение из предыдущего этапа
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx для SPA
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
