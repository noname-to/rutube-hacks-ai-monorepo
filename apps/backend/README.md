# Бекенд

Эта папка содержит исходный код сервиса, который соединяет алгоритм с внешним миром, позволяя отправить API запрос `POST /` и получить в ответ массив тегов.

Пример используя Curl

```curl
curl --location 'http://0.0.0.0:8000' \
--form 'file=@"C:\\...\4ac3ae3413347e4bcaa66faf649e5cde.mp4"' \
--form 'title="aa"' \
--form 'description="bb"'
```

## Стек

-   Python
-   FastAPI
-   [Poetry](https://python-poetry.org/) (пакетный менеджер)
-   Docker (весь проект упакован в контейнеры)
-   [Caddy](https://caddyserver.com/docs/) (в качестве reverse-proxy и отдачи фронтенд статики)
