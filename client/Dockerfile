FROM node:22-alpine as base

WORKDIR /track

COPY . .

RUN npm i -gE bun@1.3.3

WORKDIR /track/client

EXPOSE 5175