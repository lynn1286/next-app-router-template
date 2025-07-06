'use client';

import { useCounterStore } from '@/providers/counter-store-provider';

// 计数器组件
const Counter = () => {
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

export default Counter;
