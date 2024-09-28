# Наш проект

<!-- TODO:// видео-скринкаст -->

<video src='https://static.videezy.com/system/resources/previews/000/038/120/original/puppy_hand.mp4'></video>

## Общее писание решения

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

Отредактируйте Caddyfile

```Caddyfile
:80 { # Поменяйте :80 на доменное имя, которое привязано к серверу на котором вы разворачиваете
	root * /srv
	file_server

	handle /api/* {
		rewrite * /
		reverse_proxy backend:8000
	}
}
```

Так-как сервисы упакованы в [Docker](https://docs.docker.com/) и могут быть развёрнуты простой командой:

```sh
docker compose up
```

<!-- Ссылка на презентацию -->
