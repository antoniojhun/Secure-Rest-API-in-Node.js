FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install -g nodemon
RUN npm install -g body-parser

RUN npm install

EXPOSE 3600

CMD ["npm", "run", "start"]