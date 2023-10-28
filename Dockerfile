FROM node:14-alpine

WORKDIR /usr/src/app

EXPOSE 3000

CMD ["npm","run","start:dev"]
