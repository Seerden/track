FROM node:22-alpine

WORKDIR /track

COPY shared/src/ shared/src/

COPY server/ server/

WORKDIR /track/server

EXPOSE 5000

ENV CHOKIDAR_USEPOLLING=true