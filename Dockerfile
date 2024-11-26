# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy source files and static assets
COPY . .

# Disable telemetry during the build process
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build  # Ensure next build is run and .next is created

# Production image: minimal runtime
FROM base AS runner
WORKDIR /app

# Set environment variables for production
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Create a non-root user for running the application
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files and directories
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./ .next  # Copy the production build

# Use non-root user for security
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
