FROM node:20-alpine AS base

FROM base AS builder
WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# Set working directory

# Copy root package files
COPY package.json package-lock.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/

# Install dependencies (including shared)
RUN npm ci

# Copy source code
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api
COPY tsconfig* ./

# Build shared first
RUN npm run build -w packages/shared

# Build api
RUN npm run build -w apps/api
RUN npm prune --production

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/

WORKDIR /app/apps/api

EXPOSE 4000

CMD ["node", "dist/main"]
