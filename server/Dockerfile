FROM node:22-alpine as base

WORKDIR /track

COPY . .

RUN npm i -gE bun@1.3.3

WORKDIR /track/server

EXPOSE 5000

ENV CHOKIDAR_USEPOLLING=true