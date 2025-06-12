'use client';

import { useState } from 'react';
import {
  CounterStoreProvider,
  useCounterStore,
} from '../../providers/counter-store-provider';
import {
  TodoStoreProvider,
  useTodoStore,
} from '../../providers/todo-store-provider';

// 计数器组件
const CounterComponent = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">计数器</h2>
      <div className="mb-4 flex items-center justify-center space-x-4">
        <button
          onClick={decrement}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          -
        </button>
        <span className="text-2xl font-bold">{count}</span>
        <button
          onClick={increment}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          +
        </button>
      </div>
      <button
        onClick={reset}
        className="w-full rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        重置
      </button>
      <p className="mt-4 text-sm text-gray-600">
        计数器状态会在页面刷新后保持不变，因为它使用了 Zustand 的 persist
        中间件。
      </p>
    </div>
  );
};

// 待办事项组件
const TodoComponent = () => {
  const [newTodo, setNewTodo] = useState('');
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">待办事项列表</h2>
      <form onSubmit={handleAddTodo} className="mb-4 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="添加新的待办事项..."
          className="flex-grow rounded-l border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-r bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          添加
        </button>
      </form>

      <ul className="mb-4 max-h-60 space-y-2 overflow-y-auto">
        {todos.length === 0 ? (
          <li className="py-2 text-center text-gray-500">暂无待办事项</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border-b p-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-2"
                />
                <span
                  className={todo.completed ? 'text-gray-400 line-through' : ''}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </li>
          ))
        )}
      </ul>

      {todos.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span>{todos.filter((t) => !t.completed).length} 项待完成</span>
          <button
            onClick={clearCompleted}
            className="text-gray-500 hover:text-gray-700"
          >
            清除已完成
          </button>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-600">
        待办事项列表也会在页面刷新后保持不变，展示了 Zustand
        在复杂状态管理中的应用。
      </p>
    </div>
  );
};

// 主页面
export default function ZustandPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Zustand 状态管理示例
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <CounterStoreProvider>
          <CounterComponent />
        </CounterStoreProvider>

        <TodoStoreProvider>
          <TodoComponent />
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
