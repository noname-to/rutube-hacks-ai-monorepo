FROM oven/bun:1

ARG VITE_ENDPOINT

COPY ./ /app/

WORKDIR /app

RUN bun install

RUN echo "VITE_ENDPOINT: ${VITE_ENDPOINT}"

RUN VITE_ENDPOINT=${VITE_ENDPOINT} bunx --bun vite build --outDir /app/build-temp

# Костыль но с кем не бывает
RUN echo '#!/bin/sh\ncp -r /app/build-temp/* /app/dist/' > /app/init.sh
RUN chmod +x /app/init.sh

ENTRYPOINT ["/app/init.sh"]