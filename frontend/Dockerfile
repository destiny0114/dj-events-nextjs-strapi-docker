FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN yarn --frozen-lockfile

FROM node:16-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next ./.next

CMD ["node", "server.js"]