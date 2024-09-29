# Наш проект

https://github.com/user-attachments/assets/4acb12aa-bd2e-4ccd-8bd7-4b55bab70843

## Общее описание решения

Наше решение позволяет в формате конвейера подбирать теги для видео на платформе RUTUBE, достигая наилучшего баланса между скоростью и точностью алгоритма.

Мы добились значительной экономии ресурсов видеохостинга за счёт эффективного сжатия аудио- и видеопотока, в том числе с помощью понижения FPS и весовой выборке материала.

Наш алгоритм полностью написан на Python и использует под собой генеративные сети для определения контекста видео (Whisper-Large-V3, LLaMA-Next-Video-7B-HF, BERT), а также векторизацию и кластеризацию путем метода нахождения ближайших векторов для сопоставления контекста с вводными тегами.

### Сервисы

_Код вы можете посмотреть по клику_

-   [ml-tagger](https://github.com/noname-to/rutube-hacks-ai-ml-tagger) (`Python`, `pandas`, `sklearn`, `numpy`)
-   [av-keywords](https://github.com/noname-to/rutube-hacks-ai-monorepo/tree/main/apps/av_keywords) (`Python`, `av`, `transformers`, `torch`, `numpy`)

Наше решение представляет собой высокоэффективный алгоритм для автоматического подбора тегов к видео на платформе RUTUBE. Основная задача алгоритма — достичь оптимального баланса между скоростью обработки и точностью определения контекста видео.

#### Ключевые особенности:

-   **Генеративные модели:** Алгоритм использует мощные нейросетевые модели, такие как _Whisper-Large-V3_, _LLaMA-Next-Video-7B-HF_ и модификации _BERT_ для анализа видеопотока, аудиопотока и метаданных видео.
-   **Контекстное определение тегов:** Путем векторизации данных и кластеризации мы сопоставляем контекст видео с вводными тегами для получения наиболее релевантных результатов.
-   **Оптимизация ресурсов:** Для экономии ресурсов видеохостинга используются методы сжатия аудио- и видеопотока, такие как сокращение кадров и временная выборка материала, что позволяет снижать нагрузку на систему без ущерба для точности.

Алгоритм полностью реализован на Python и позволяет видеохостингу значительно улучшить процесс категоризации видео, минимизируя время обработки и повышая точность присвоения тегов.

#### Веб-сервис

-   [**Бекенд**](https://github.com/noname-to/rutube-hacks-ai-web-monorepo/tree/main/apps/backend) (`Python`, `FastAPI`, `Poetry`)
-   [**Фронтенд**](https://github.com/noname-to/rutube-hacks-ai-web-monorepo/tree/main/apps/client) (`React`, `framer-motion`)

Эти сервисы отвечают за демонстрацию нашего продукта в бою. Готовое решение представляет собой удобный веб-интерфейс, на котором вы можете загрузить видео, указать его название и описание. В ответ вы получите набор тегов, которые сформирует наш алгоритм.

### Как запустить проект

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
xn--e1aijbaf9a6d.xn--p1ai { # адрес фронтенда
	root * /srv/client
	file_server
}

xn--80aqu.xn--e1aijbaf9a6d.xn--p1ai { # адрес бекенда
	header Access-Control-Allow-Origin *
	header Access-Control-Allow-Methods "GET, POST, OPTIONS"
	header Access-Control-Allow-Headers "Content-Type, Authorization"

	reverse_proxy backend:8000
}
```

Так же нам необходимо установить [nvidia-container-toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html#installing-with-apt)

```sh
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit

sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

Так-как сервисы упакованы в [Docker](https://docs.docker.com/) и могут быть развёрнуты простой командой:

```sh
docker compose up -d
```
