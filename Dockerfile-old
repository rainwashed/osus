# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:canary AS build
WORKDIR /app

COPY package.json ./
COPY . .

RUN bun install --ignore-scripts better-sqlite3
# use ignore-scripts to avoid builting node modules like better-sqlite3
RUN bun install --frozen-lockfile

# Copy the entire project
RUN bun --bun run build

# Change the port and host
ENV PORT=80
ENV HOST=0.0.0.0
# Set Nuxt environment to listen on 0.0.0.0 and port 80
ENV NITRO_PORT=80
ENV NITRO_HOST=0.0.0.0

EXPOSE 80

CMD ["bun", "--bun", "run", "/app/.output/server/index.mjs"]

