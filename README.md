# Eve Marketeur

## Local Dev

```
pnpm run db:start
pnpm run dev
```

## Production

Deploys are automatically handled on push to main branch via Dokploy.

### Gotchas

- **Database migrations are done manually!**
- `TZ=UTC` must be set!

### DB Migration

1. Set up a public internet connection url for the prod DB in Dokploy
2. Set the `PROD_DATABASE_URL` env variable to the external connection string
3. Run `pnpm run db:push --config ./drizze-prod.config.ts`
4. Remove public internet connection from prod DB in Dokploy
