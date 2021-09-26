#FROM node:12.16.1
#WORKDIR /serveur/src
#COPY /serveur/package*.json ./
#RUN npm install
#COPY /serveur ./
#CMD node /serveur/src/server.js
#EXPOSE 3000

FROM node:latest as build

WORKDIR /usr/local/app

COPY /frontend /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/sample-angular-app /usr/share/nginx/html

EXPOSE 80
