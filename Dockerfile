# syntax=docker/dockerfile:1

FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install system dependencies if needed
RUN apk add --no-cache libc6-compat

# Create a non-root user for security
RUN addgroup -S vitegroup && adduser -S viteuser -G vitegroup
USER viteuser

# Copy only necessary files (package manager files for dependencies)
COPY --chown=viteuser:vitegroup package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm install --frozen-lockfile; \
  else echo "No lockfile found, unable to install dependencies" && exit 1; \
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