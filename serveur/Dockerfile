FROM node:latest

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . ./

CMD node /app/src/server.js

EXPOSE 3100
