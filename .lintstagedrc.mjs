const lintStagedConfig = {
  '**/*.(ts|tsx)': () => [`pnpm exec tsc --noEmit`],
  '**/*.(ts|tsx|js)': () => [`pnpm run format:check`, `pnpm run lint --quiet`],
  '**/*.(md|json|css|scss)': () => [`pnpm run format:check`],
};

export default lintStagedConfig;
