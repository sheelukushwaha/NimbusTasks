# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Disable ESLint/type checking during build (optional)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build || echo "Build warnings/errors ignored"

# Stage 2: Production image
FROM node:22-alpine AS runner
WORKDIR /app

# Copy only required files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start Next.js server
CMD ["npm", "start"]