# Mahjong

Игра “Маджонг”, где вместо традиционных символов используются логотипы автомобильных брендов. Она объединит развлечение, развитие памяти и внимательности, а также позволит игрокам познакомиться с миром автомобильной индустрии.

## Демо

Вы можете протестировать на своем устройстве, развернув приложение локально или перейдя по ссылке https://mahjong.mustafin.online/

Также доступно видео с демонстрацией работы приложения - https://drive.google.com/file/d/14uVChQroixnNoOgig4xHAvA5FKykSKIn/view?usp=sharing

## Инструкция по запуску React

1. Убедитесь что у вас установленный node.js и npm
2. Склонируйте репозиторий
3. Убедитесь что вы находитесь на ветке main
4. Откройте терминал в корне проекта
5. Введите "npm install"
6. Введите "npm run dev"
7. Эта команда запускает Vite сервер разработки, и вы увидите сообщение, что проект запущен, а также порт для подключения.

## Инструкция по запуску Django

1. Убедитесь что у вас установленный python и pip
2. Загрузите и активируйте виртуальное окружение
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip3 install -r requirements.txt
   ```
3. Применение миграций
   ```bash
   cd backend
   python3 manage.py makemigrations
   python3 manage.py migrate
   ```
4. Запуск сервера
   ```bash
   python3 manage.py runserver
   ```
