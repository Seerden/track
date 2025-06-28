FROM node:22-alpine

RUN corepack enable
RUN yarn set version 4.6.0

WORKDIR /track
COPY . .

WORKDIR /track/server

RUN apk add --no-cache aws-cli

EXPOSE 5000

ENV CHOKIDAR_USEPOLLING=true