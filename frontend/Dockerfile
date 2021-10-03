FROM node:latest AS build

WORKDIR /usr/local/app

COPY /frontend /usr/local/app

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/go-fullstack-frontend /usr/share/nginx/html
