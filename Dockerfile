# Stage 1: Build with Node 20
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files and install dependencies (build stage)
COPY package.json bun.lock package-lock.json* ./

# If you have both npm/yarn/bun lock files, adjust accordingly.
RUN npm install

# Copy all source code
COPY . .

# Build your Nuxt app
RUN npm run build

# Stage 2: Runtime with Bun
FROM oven/bun:1.1.6-slim

WORKDIR /app

# Copy package files (optional but good for Bun)
COPY package.json bun.lock ./

# Copy production node_modules from builder (already built with Node 20)
COPY --from=builder /app/node_modules ./node_modules

# Copy built Nuxt output
COPY --from=builder /app/.output ./.output

# Set Nuxt environment to listen on 0.0.0.0 and port 80
ENV NITRO_PORT=80
ENV NITRO_HOST=0.0.0.0

EXPOSE 80

# Run Nuxt with Bun runtime
CMD ["bun", "run", ".output/server/index.mjs"]
