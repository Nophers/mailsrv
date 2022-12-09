FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

RUN npm i --production

COPY . .

CMD [ "npm", "prod" ]