# -----------------------------
# Stage 1: Build
# -----------------------------
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all files
COPY . .

# Build Next.js (not strictly needed for API-only, but good for production)
RUN npm run build

# -----------------------------
# Stage 2: Production Image
# -----------------------------
FROM node:22-alpine

WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/models ./models

# Expose port 3001 (matching backend dev)
EXPOSE 3001

# Set environment variables (can be overridden in ECS)
ENV NODE_ENV=production

# Start backend
CMD ["npm", "start"]