## Description

Установка:
npm i

Запуск:

Сервер с бд:
sudo docker-compose up -d

логи сервера:
docker-compose logs -f nestdev

Пока стоит автосинхронизация базы данных, без миграций, их можно сгенерить будет и запускать когда будет развертка на стейдже, чтобы ничего не удалялось без них.
Чтобы поглядеть на них на локале, можно изменить synchronize флаг на false, удалить контейнер с базой и запустить заного.
Сгенерить миграции с нуля

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

Что потестить?

swagger

```bash
http://localhost:3000/api
```

Запрос запускает в очередь рассылку писем, обрабатывается в отдельном процессе

```bash
http://localhost:3000/admins/sendMail
```

Загрузка файла

```bash
http://localhost:3000/files
```

Политики аутентификации запросов(guards)

Авторизация по jwt токену, пока без рефреша

декоратор currentUser извлекает role,id юзера из jwt токена, можно добавить и другую инфу, или полное получение записи,
посмотреть можно users/users.controller.ts(method whoami)

В планах добвить сервер, redis в докер контейнеры.

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
