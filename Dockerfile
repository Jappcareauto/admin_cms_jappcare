# syntax=docker/dockerfile:1

FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install system dependencies if needed
RUN apk add --no-cache libc6-compat

# Create a non-root user for security
RUN addgroup -S vitegroup && adduser -S viteuser -G vitegroup

# Fix permissions on /app before switching to non-root user
RUN chown -R viteuser:vitegroup /app

# Switch to the non-root user
USER viteuser

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies and capture logs
RUN \
  if [ -f yarn.lock ]; then \
    yarn --frozen-lockfile || { echo "Yarn installation failed"; exit 1; }; \
  elif [ -f package-lock.json ]; then \
    npm ci --unsafe-perm || { echo "npm installation failed"; cat /home/viteuser/.npm/_logs/*.log; exit 1; }; \
  elif [ -f pnpm-lock.yaml ]; then \
    npm install -g pnpm && pnpm install --frozen-lockfile || { echo "pnpm installation failed"; exit 1; }; \
  else \
    npm install --unsafe-perm || { echo "Fallback npm installation failed"; exit 1; }; \
  fi

# Copy the rest of the application files (source code and assets)
COPY --chown=viteuser:vitegroup . .

# Expose the port for the development server
EXPOSE 5173

# Environment variables for Vite (used at runtime)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Command to run the development server
CMD ["npm", "run", "dev", "--", "--host"]
