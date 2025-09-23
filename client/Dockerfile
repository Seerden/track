FROM node:22-alpine

WORKDIR /track

COPY shared/src/ shared/src/
COPY server/src/ server/src/

COPY . .

WORKDIR /track/client

EXPOSE 5175