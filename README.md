# Guitar Shop — интернет-магазин по продаже гитар
## Запуск проекта
npm start
## Сценарии
    ### cli
    npm run cli - запуск Cli
      npm run cli -- --help Команда выводит информацию о доступных командах
      npm run cli -- --generate 5 ./mocks/test.tsv http://localhost:3123/api  - Команда для генерации и заполнения БД тестовыми данными
    ### запуск JSON-сервера
    npm run mock:server

    ### Backend
    npm run start
    npm run start: dev

    ### Frontend
    cd frontend/project
    npm start

## Переменные окружения

PORT=4000 - порт Backend
SALT=text
DB_HOST=127.0.0.1
DB_USER=admin - имя пользователя
DB_PASSWORD=test - пароль пользователя
DB_NAME=guitar-shop -название базы данных 
UPLOAD_DIRECTORY=upload
JWT_SECRET=khgjkhgrfjhgf
JWT_ALGORITM = HS256

PORT=3000  - порт Frontend
DISABLE_ESLINT_PLUGIN=true

##  Количество часов, затраченных на проект
~ 38 часов