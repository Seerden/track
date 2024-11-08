FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
EXPOSE 5173
COPY . .
RUN ["npm", "run", "dev"]

