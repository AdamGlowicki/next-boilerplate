# Source of the config available here:
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# Nextjs docs here:
# https://nextjs.org/docs/deployment#docker-image
#

# Install dependencies only when needed
FROM node:16.13.2-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed
RUN apk add --no-cache libc6-compat curl
WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16.13.2-alpine3.15 AS builder
WORKDIR /code
COPY --from=deps /code/node_modules ./node_modules
COPY . .

# Env available during the build
ENV PATH /code/node_modules/.bin:$PATH

RUN yarn build

# Production image, copy all the files and run next
FROM node:16.13.2-alpine3.15 AS runner
WORKDIR /code

# Env available during runtime
ENV PATH /code/node_modules/.bin:$PATH
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /code/next.config.js ./
COPY --from=builder /code/public ./public
# Required for sentry
COPY --from=builder /code/.git ./.git
COPY --from=builder /code/package.json ./package.json
COPY --from=builder /code/node_modules ./node_modules

COPY --from=builder --chown=nextjs:nodejs /code/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000

# We are not using traced files feature yet b/c of experimental flag
# More here: https://nextjs.org/docs/advanced-features/output-file-tracing
CMD ["node_modules/.bin/next", "start"]
