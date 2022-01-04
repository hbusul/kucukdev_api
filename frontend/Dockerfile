FROM node:15.7.0-buster

RUN mkdir -p /app/src
WORKDIR /app

COPY package.json package-lock.json tailwind.config.js /app/
COPY src/tailwind.css /app/src/tailwind.css

RUN npm install && npm run build:tailwind

COPY kucukdevapi /app/kucukdevapi/

EXPOSE 3000
CMD cp /app/node_modules/tailwind.output.css /app/src/tailwind.output.css && exec npm start
