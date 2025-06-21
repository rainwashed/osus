# Use official Node.js image
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency files first for better caching
COPY package.json ./

# Install dependencies
# Optional: use `npm_config_build_from_source=false` to avoid building native modules
ENV npm_config_build_from_source=false

# Use prebuilt binaries if possible (you can also preinstall better-sqlite3 manually from binary)
RUN npm install --ignore-scripts

# Copy rest of the application
COPY . .

# Install scripts separately if needed now (or avoid if better-sqlite3 is problematic)
RUN npm install --omit=dev

# Build the app
RUN npm run build

# Set environment variables
ENV PORT=80
ENV HOST=0.0.0.0
ENV NITRO_PORT=80
ENV NITRO_HOST=0.0.0.0

# Expose port
EXPOSE 80

# Start the server
CMD ["node", ".output/server/index.mjs"]
