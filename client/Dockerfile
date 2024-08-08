FROM node:alpine

WORKDIR /track/client

COPY package*.json .

RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev"]