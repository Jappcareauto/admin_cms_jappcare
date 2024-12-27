# syntax=docker/dockerfile:1

FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install system dependencies if needed
RUN apk add --no-cache libc6-compat

# Create a non-root user for security
RUN addgroup -S vitegroup && adduser -S viteuser -G vitegroup

# Set npm global installation path to a user-accessible directory
RUN mkdir -p /home/viteuser/.npm-global && \
    npm config set prefix '/home/viteuser/.npm-global' && \
    echo "export PATH=/home/viteuser/.npm-global/bin:$PATH" >> /home/viteuser/.profile

# Switch to non-root user
USER viteuser

# Update PATH for the current shell session
ENV PATH="/home/viteuser/.npm-global/bin:$PATH"

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies with improved error handling
RUN \
  if [ -f yarn.lock ]; then \
    echo "Using Yarn to install dependencies"; \
    yarn --frozen-lockfile || { echo "Yarn installation failed"; exit 1; }; \
  elif [ -f package-lock.json ]; then \
    echo "Using npm to install dependencies"; \
    npm ci --unsafe-perm || { echo "npm installation failed"; exit 1; }; \
  elif [ -f pnpm-lock.yaml ]; then \
    echo "Using pnpm to install dependencies"; \
    npm install -g pnpm && pnpm install --frozen-lockfile || { echo "pnpm installation failed"; exit 1; }; \
  else \
    echo "No lockfile found, falling back to npm install"; \
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
