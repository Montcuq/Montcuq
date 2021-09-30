#FROM node:latest
#WORKDIR /app
#COPY /serveur/package*.json ./
#RUN npm install
#COPY /serveur ./
#CMD node /app/src/server.js
#EXPOSE 3100

FROM node:latest AS build

WORKDIR /usr/local/app

COPY /frontend /usr/local/app

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/go-fullstack-frontend /usr/share/nginx/html

EXPOSE 4200
