## Environment Configuration

This project uses `env-cmd` for environment configuration. Four environments are available:

- `dev` - Development environment
- `beta` - Beta testing environment
- `uat` - User Acceptance Testing environment
- `prod` - Production environment

### Running in different environments

```bash
# Development
npm run dev:dev
npm run build:dev
npm run start:dev

# Beta
npm run dev:beta
npm run build:beta
npm run start:beta

# UAT
npm run dev:uat
npm run build:uat
npm run start:uat

# Production
npm run dev:prod
npm run build:prod
npm run start:prod
```

Environment variables are configured in `.env-cmdrc.json` file.
