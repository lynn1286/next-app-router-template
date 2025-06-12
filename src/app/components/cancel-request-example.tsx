'use client';

import fetchWrapper from '@/https/fetch-wrapper';
import { useState } from 'react';

// 取消请求示例
const CancelRequestExample = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialMessage, setInitialMessage] = useState(
    '点击"开始长时间请求"按钮开始一个8秒的请求，然后点击"取消请求"可以中断该请求。',
  );
  const [controller, setController] = useState<AbortController | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressTimer, setProgressTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const [elapsedTimer, setElapsedTimer] = useState<NodeJS.Timeout | null>(null);

  // 清除所有计时器
  const clearAllTimers = () => {
    if (progressTimer) {
      clearInterval(progressTimer);
      setProgressTimer(null);
    }
    if (elapsedTimer) {
      clearInterval(elapsedTimer);
      setElapsedTimer(null);
    }
  };

  // 发起可取消的请求
  const handleStartRequest = async () => {
    // 清理旧计时器
    clearAllTimers();

    const abortController = new AbortController();
    const { signal } = abortController;

    setController(abortController);
    setLoading(true);
    setError('');
    setInitialMessage('');
    setProgress(0);
    setElapsedTime(0);
    setResult('请求已开始，8秒后返回结果...');

    // 启动进度条，模拟8秒加载
    const totalTime = 8000; // 总时间8秒
    const interval = 100; // 每100毫秒更新一次
    const steps = totalTime / interval;
    let currentStep = 0;

    const pTimer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, (currentStep / steps) * 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(pTimer);
      }
    }, interval);
    setProgressTimer(pTimer);

    // 启动计时器，显示已经过时间
    const eTimer = setInterval(() => {
      setElapsedTime((prev) => prev + 0.1);
    }, 100);
    setElapsedTimer(eTimer);

    try {
      const startTime = performance.now();
      const data = await fetchWrapper.get('/api/data/slow', { signal });
      const endTime = performance.now();

      setResult(
        `请求成功，耗时: ${(endTime - startTime).toFixed(2)}ms\n${JSON.stringify(data, null, 2)}`,
      );
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setError('请求已被用户取消');
      } else {
        setError(`请求失败: ${(err as Error).message}`);
      }
    } finally {
      clearAllTimers();
      setLoading(false);
      setController(null);
    }
  };

  // 取消请求
  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setController(null);
      clearAllTimers();
      setResult(`用户在 ${elapsedTime.toFixed(1)} 秒后取消了请求`);
    }
  };

  return (
    <div className="mb-10 rounded-lg border bg-gray-50 p-6">
      <h2 className="mb-4 text-xl font-bold">取消请求示例</h2>

      <div className="mb-4 rounded bg-blue-100 p-2">
        <p className="mb-2">本示例演示如何取消正在进行的请求：</p>
        <ol className="list-decimal pl-5">
          <li>{`点击"开始长时间请求"按钮发起一个8秒的请求`}</li>
          <li>{`在请求完成前，点击"取消请求"按钮中断请求`}</li>
          <li>观察请求被取消的结果和耗时</li>
        </ol>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={handleStartRequest}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? '请求进行中...' : '开始长时间请求'}
        </button>

        <button
          onClick={handleCancelRequest}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          disabled={!controller}
        >
          取消请求
        </button>
      </div>

      {loading && (
        <div className="mb-4">
          <p className="mb-1 text-blue-500">
            请求进行中: {elapsedTime.toFixed(1)} 秒 / 8.0 秒
          </p>
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {error && <p className="mb-4 text-red-500">{error}</p>}

      <div className="mt-4">
        <h3 className="mb-2 font-bold">结果</h3>
        <pre className="h-[200px] overflow-auto rounded border bg-white p-2">
          {initialMessage || result || '暂无结果'}
        </pre>
      </div>
    </div>
  );
};

export default CancelRequestExample;
