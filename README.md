## Description

Installation:
npm i

Start:

Server with db:
sudo docker-compose up -d

Server logs:
docker-compose logs -f nestdev


```bash
npm run typeorm migration:generate -- -n initial-schema -o
```

Запустить

```bash
npm run typeorm migration:run
```

#------------------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------------------#


swagger

```bash
http://localhost:3000/api
```

Req for email sending queue

```bash
http://localhost:3000/admins/sendMail
```
File load

```bash
http://localhost:3000/files
```


Decorator currentUser get role,id of user from jwt token, look at users/users.controller.ts(method whoami)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
