import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 基础配置
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Prettier 配置放在最后，覆盖之前的规则以解决冲突
  ...compat.extends('prettier'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];

export default eslintConfig;
