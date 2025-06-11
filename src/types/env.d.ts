declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    /** API 地址 */
    NEXT_PUBLIC_API_URL: string;
    // 可以添加其他环境变量的类型声明
  }
}
