FROM oven/bun:latest AS build
WORKDIR /app

COPY package.json ./

RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:latest AS production
WORKDIR /app

COPY --from=build /app/.output /app/

ENV PORT=80
ENV HOST=0.0.0.0

# make sure to set the .env when using docker run or docker compose
ENV SPOTIFY_CLIENT_ID=
ENV SPOTIFY_CLIENT_SECRET=
ENV OSU_CLIENT_ID=
ENV OSU_CLIENT_SECRET=

EXPOSE 80

ENTRYPOINT [ "bun", "run", "/app/server/index.mjs" ]