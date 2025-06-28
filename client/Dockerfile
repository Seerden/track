FROM node:22-alpine

RUN corepack enable
RUN yarn set version 4.6.0

WORKDIR /track
COPY . .

WORKDIR /track/client

EXPOSE 5175