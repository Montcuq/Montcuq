FROM node:latest
WORKDIR /app
COPY /serveur/package*.json ./
RUN npm install
COPY /serveur ./
CMD node /app/src/server.js
EXPOSE 3100
