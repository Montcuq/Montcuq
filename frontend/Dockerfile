FROM node:latest AS build

WORKDIR /usr/local/app

COPY . /usr/local/app

RUN npm install

RUN npm run build

FROM docker2021repos/nginx:latest

COPY --from=build /usr/local/app/dist/go-fullstack-frontend /usr/share/nginx/html
