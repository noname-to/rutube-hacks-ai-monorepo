FROM python:3.11-slim

RUN pip install poetry

COPY ./av_keywords /app/av_keywords

WORKDIR /app/backend

COPY ./backend/pyproject.toml  /app/backend/
COPY ./backend/poetry.lock /app/backend/
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

COPY ./backend /app/backend

RUN ls

RUN ls /app

WORKDIR /app/backend

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
