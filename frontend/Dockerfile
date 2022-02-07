FROM node:15.7.0-buster

RUN mkdir -p /app/src
WORKDIR /app

COPY package.json package-lock.json /app/
COPY kucukdevapi /app/kucukdevapi/

RUN npm install 

EXPOSE 3000
CMD exec npm start
