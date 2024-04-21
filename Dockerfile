FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

USER node

EXPOSE 3000

CMD [ "node","src/server.js"]