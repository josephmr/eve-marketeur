FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
# TODO: Fix db to not require a real database at build time
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN pnpm run build
RUN pnpm prune --prod

FROM node:22-alpine AS runner
WORKDIR /app

RUN corepack enable

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

USER nodejs
EXPOSE 3000
ENV NODE_ENV=production PORT=3000

CMD [ "./docker-entrypoint.sh"]