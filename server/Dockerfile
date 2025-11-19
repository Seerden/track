FROM node:22-alpine

WORKDIR /track

COPY . .

RUN npm install

WORKDIR /track/server

EXPOSE 5000

ENV CHOKIDAR_USEPOLLING=true