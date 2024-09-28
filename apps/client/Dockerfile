FROM oven/bun:1

COPY ./ /app/

WORKDIR /app

RUN bun install

RUN VITE_ENDPOINT=http://127.0.0.1/api/ bunx --bun vite build --outDir /app/build-temp

# Костыль но с кем не бывает
RUN echo '#!/bin/sh\ncp -r /app/build-temp/* /app/dist/' > /app/init.sh
RUN chmod +x /app/init.sh

ENTRYPOINT ["/app/init.sh"]