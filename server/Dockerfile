# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости (включая devDependencies для sequelize-cli)
RUN npm ci

# Копируем весь код приложения
COPY . .

# Открываем порт (можно переопределить через ENV)
EXPOSE 3001

# Запускаем миграции и затем стартуем сервер
CMD npm run migrate && npm start
