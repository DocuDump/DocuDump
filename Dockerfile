FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN \
    if [ -f package-lock.json ]; then npm ci; \
    else echo "Lockfile not found." && exit 1; \
    fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Build app using next.js experimental compile
RUN \
    if [ -f package-lock.json ]; then npm run compile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN apk add --no-cache su-exec

ENV NODE_ENV production

# Disable Next.js telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Enable if using the public folder
# COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy dbmate because nextjs doesn't think we need it by default
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/dbmate ./node_modules/dbmate
COPY --from=deps --chown=nextjs:nodejs /app/node_modules/@dbmate ./node_modules/@dbmate
COPY --from=builder --chown=nextjs:nodejs /app/src/db/migrations /app/src/db/migrations

COPY --from=builder --chown=nextjs:nodejs /app/docker/docker-entrypoint.sh /sbin/docker-entrypoint.sh
RUN chmod +x /sbin/docker-entrypoint.sh

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV DATABASE_URL "sqlite3:/data/db.sqlite3"
ENV DBMATE_MIGRATIONS_DIR "/app/src/db/migrations"

VOLUME ["/data"]

ENTRYPOINT ["/sbin/docker-entrypoint.sh"]
