# lablesTest
Тестовое задание

Используемые технологии:
1. Node.js + TypeScript
2. Data base - PostgreSQL
3. pgAdmin
4. ORM - TypeORM
5. Docker + docker-compose

 Команды для запуска:
 1. docker-compose up  - запускает два контейнера (pgAdmin и саму базу данных)
 2. npm start - запускает проект и применяет миграции (model/migrations)

 Доступ к pgAdmin - http://localhost:82/login 

 email - test@mail.ru
 password - test

Структура проекта:
1. Класс расположен в папке model, файл class.ts
2. Пример использования класса - корневой файл index.ts
3. При запуске проект автоматически применяются миграции, расположены в директории model/migrations
