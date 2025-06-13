'use client';

import { CounterStoreProvider } from '@/providers/counter-store-provider';
import { TodoStoreProvider } from '@/providers/todo-store-provider';
import Counter from './components/counter';
import Todo from './components/todo';

// 主页面
export default function ZustandPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Zustand 状态管理示例
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <CounterStoreProvider>
          <Counter />
        </CounterStoreProvider>

        <TodoStoreProvider>
          <Todo />
        </TodoStoreProvider>
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Zustand 的主要特点</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>轻量级 - 只有约 1KB 的大小</li>
          <li>简单直观的 API - 没有样板代码</li>
          <li>支持中间件 - 例如持久化、状态合并等</li>
          <li>不需要全局 Provider - 可以按组件或页面创建独立的 Provider</li>
          <li>类型安全 - 完全支持 TypeScript</li>
          <li>可组合 - 可以轻松组合多个 store</li>
          <li>支持 React 之外的环境 - 可用于任何 JavaScript 环境</li>
        </ul>
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Next.js 中的最佳实践</h2>
        <p className="mb-4">
          在 Next.js 中使用 Zustand
          时，应该避免全局状态管理，而是按照以下方式使用：
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>每个请求创建一个 store - 避免在请求之间共享状态</li>
          <li>使用 Context Provider 模式 - 确保 store 在组件级别隔离</li>
          <li>
            React Server Components 不应读取或写入 store - 遵循 Next.js 架构
          </li>
          <li>
            使用 vanilla store 和 useStore hook - 更好地支持 SSR 和客户端水合
          </li>
        </ul>
      </div>
    </div>
  );
}
