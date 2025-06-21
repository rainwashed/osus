# Build stage
FROM oven/bun:canary AS build
WORKDIR /app

COPY package.json ./
COPY . .

RUN bun install --ignore-scripts better-sqlite3
RUN bun install --frozen-lockfile

# Run Nuxt build
RUN bun --bun run build

# Production stage
FROM oven/bun:canary AS runner
WORKDIR /app

# Copy built app from previous stage
COPY --from=build /app/.output ./.output

# Set env vars
ENV PORT=80
ENV HOST=0.0.0.0
ENV NITRO_PORT=80
ENV NITRO_HOST=0.0.0.0

EXPOSE 80

# Start Nitro server
CMD ["bun", "--bun", "run", ".output/server/index.mjs"]