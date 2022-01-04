FROM node:15.7.0-buster

RUN mkdir -p /app/src
WORKDIR /app

COPY package.json package-lock.json tailwind.config.js /app/
COPY src/tailwind.css /app/src/tailwind.css
COPY kucukdevapi /app/kucukdevapi/

RUN npm install && npm run build:tailwind

EXPOSE 3000
CMD npm start
