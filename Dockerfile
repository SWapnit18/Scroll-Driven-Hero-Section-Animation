# ==========================================
# Multi-stage Dockerfile for Universal Cross-Platform Deployment
# ==========================================

# 1. Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests first for optimal layer caching
COPY package*.json ./

# Install all dependencies (clean install)
RUN npm ci

# Copy full application source code
COPY . .

# Build production bundle
RUN npm run build

# 2. Production runtime stage (Ultralight Nginx Alpine)
FROM nginx:alpine-slim AS runner

# Copy customized Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard web port
EXPOSE 80

# Health check to ensure service vitality
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
