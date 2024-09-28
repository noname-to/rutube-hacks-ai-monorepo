# Наш проект

<!-- TODO:// видео-скринкаст -->

https://github.com/user-attachments/assets/ec84ee54-18e8-4da2-bcfb-11222d7232a9

## Общее описание решения

<!-- возможно тизер -->

### Сервисы

_Код вы можете посмотреть по клику_

-   ml-tagger (стек)

Этот сервис отвечает за... код смотреть тут...

-   ..etc

#### Веб-сервис

-   [**Бекенд**](https://github.com/noname-to/rutube-hacks-ai-web-monorepo/tree/main/apps/backend) (`Python`, `FastAPI`)
-   [**Фронтенд**](https://github.com/noname-to/rutube-hacks-ai-web-monorepo/tree/main/apps/client) (`React`, `framer-motion`)

Эти сервисы отвечают за демонстрацию нашего продукта в бою. Готовое решение представляет собой удобный веб-интерфейс, на котором вы можете загрузить видео, указать его название и описание. В ответ вы получите набор тегов, которые сформирует наш алгоритм.

### Как запустить весь проект (или только модельку)

Требования - Git, [Docker](https://docs.docker.com/)

Для начала склонируем наш репозиторий:

```sh
git clone https://github.com/noname-to/rutube-hacks-ai-monorepo.git
```

Укажите переменные среды под ваши нужды:

```dotenv
VITE_ENDPOINT=http://127.0.0.1/api/ # Адрес где развёрнут бекенд на который отправляет запрос фронтенд
```

Отредактируйте Caddyfile, заменив на необходимые вам домены:

```Caddyfile
ноунеймы.рф {
	root * /srv/client
	file_server
}

апи.ноунеймы.рф {
	reverse_proxy backend:8000
}
```

Так-как сервисы упакованы в [Docker](https://docs.docker.com/) и могут быть развёрнуты простой командой:

```sh
docker compose up
```

<!-- Ссылка на презентацию -->
