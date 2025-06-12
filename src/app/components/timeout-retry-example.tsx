'use client';

import fetchWrapper from '@/https/fetch-wrapper';
import { useRef, useState } from 'react';

// 超时和重试示例
const TimeoutRetryExample = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialMessage, setInitialMessage] = useState(
    '示例说明：慢速API接口响应时间为8秒，超时设置为5秒，因此会触发超时错误。带重试的请求会在失败后自动尝试重试。',
  );
  const [progress, setProgress] = useState(0);
  const [progressTimer, setProgressTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [controller, setController] = useState<AbortController | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [elapsedTimer, setElapsedTimer] = useState<NodeJS.Timeout | null>(null);
  // 当前重试次数
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = useRef(2);

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
    setElapsedTime(0);
  };

  // 更新进度条
  const startProgressTimer = (timeoutMs: number) => {
    if (progressTimer) {
      clearInterval(progressTimer);
    }

    setProgress(0);
    const interval = 100; // 每100毫秒更新一次
    const steps = timeoutMs / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, (currentStep / steps) * 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    setProgressTimer(timer);

    return timer;
  };

  // 启动计时器，显示已经过时间
  const startElapsedTimer = () => {
    if (elapsedTimer) {
      clearInterval(elapsedTimer);
    }

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 0.1);
    }, 100);

    setElapsedTimer(timer);
    return timer;
  };

  // 带超时的请求
  const handleTimeout = async () => {
    clearAllTimers();
    const abortController = new AbortController();
    setController(abortController);

    setLoading(true);
    setError('');
    setInitialMessage('');
    setResult('请求中，超时设置为5秒...');

    const timeoutMs = 5000;
    startProgressTimer(timeoutMs);
    startElapsedTimer();

    try {
      const startTime = performance.now();
      await fetchWrapper.get('/api/data/slow', {
        _timeout: timeoutMs,
        signal: abortController.signal,
      }); // 5秒超时
      const endTime = performance.now();

      setResult(`请求完成，耗时: ${(endTime - startTime).toFixed(2)}ms`);
    } catch (err) {
      if (
        (err as Error).message?.includes('取消') ||
        (err as Error).name === 'AbortError'
      ) {
        setError(`请求已被用户取消`);
      } else {
        setError(`请求失败: ${(err as Error).message}`);
      }
    } finally {
      clearAllTimers();
      setLoading(false);
      setController(null);
    }
  };

  // 计算当前重试的超时时间
  const getTimeoutForRetry = (baseTimeout: number, retryCount: number) => {
    return baseTimeout * (retryCount + 1); // 0次：1倍，1次：2倍，2次：3倍
  };

  // 带重试的请求
  const handleRetry = async () => {
    clearAllTimers();
    const abortController = new AbortController();
    setController(abortController);

    setLoading(true);
    setError('');
    setInitialMessage('');
    setRetryCount(0);

    const baseTimeoutMs = 3000; // 基础超时时间
    const retryInterval = 1000;

    // 计算总的预计时间：基础超时 + 第一次重试(2倍超时) + 第二次重试(3倍超时) + 重试间隔
    const totalTimeEstimate =
      baseTimeoutMs +
      getTimeoutForRetry(baseTimeoutMs, 1) +
      getTimeoutForRetry(baseTimeoutMs, 2) +
      retryInterval * maxRetries.current;

    setResult(
      `请求中，基础超时设置为${baseTimeoutMs / 1000}秒，最多重试${maxRetries.current}次，超时时间随重试次数线性递增，重试间隔${retryInterval / 1000}秒...`,
    );

    startProgressTimer(totalTimeEstimate);
    startElapsedTimer();

    try {
      const startTime = performance.now();

      // 手动实现重试逻辑
      let currentRetry = 0;
      let success = false;

      while (currentRetry <= maxRetries.current && !success) {
        // 检查是否已被取消
        if (abortController.signal.aborted) {
          throw new DOMException('请求已被用户取消', 'AbortError');
        }

        // 计算当前重试的超时时间
        const currentTimeoutMs = getTimeoutForRetry(
          baseTimeoutMs,
          currentRetry,
        );
        // 更新重试计数和状态
        setRetryCount(currentRetry);

        try {
          if (currentRetry > 0) {
            setResult(
              `第${currentRetry}次重试中，当前超时设置为${currentTimeoutMs / 1000}秒（${baseTimeoutMs / 1000}秒的${currentRetry + 1}倍）...`,
            );

            // 等待重试间隔，但要能够被取消
            await Promise.race([
              new Promise((resolve) => setTimeout(resolve, retryInterval)),
              new Promise((_, reject) => {
                const checkAbort = () => {
                  if (abortController.signal.aborted) {
                    reject(new DOMException('请求已被用户取消', 'AbortError'));
                  }
                };

                // 检查是否已经被取消
                checkAbort();

                // 监听取消事件
                abortController.signal.addEventListener('abort', checkAbort, {
                  once: true,
                });
              }),
            ]);
          }

          // 发送请求
          await fetchWrapper.get('/api/data/slow', {
            _timeout: currentTimeoutMs,
            signal: abortController.signal,
            next: { revalidate: 0 },
          });

          // 请求成功，跳出循环
          success = true;
          break;
        } catch (err) {
          // 如果是用户取消，直接抛出
          if (
            (err as Error).message?.includes('取消') ||
            (err as Error).name === 'AbortError'
          ) {
            throw err;
          }

          // 如果已经达到最大重试次数，抛出错误
          if (currentRetry === maxRetries.current) {
            throw err;
          }

          // 继续下一次重试
          currentRetry++;
        }
      }

      const endTime = performance.now();
      setResult(
        `请求完成，耗时: ${(endTime - startTime).toFixed(2)}ms，总共重试了${currentRetry}次`,
      );
    } catch (err) {
      if (
        (err as Error).message?.includes('取消') ||
        (err as Error).name === 'AbortError'
      ) {
        setError(`请求已被用户取消`);
      } else {
        setError(`所有重试均失败: ${(err as Error).message}`);
      }
    } finally {
      clearAllTimers();
      setLoading(false);
      setController(null);
      setRetryCount(0);
    }
  };

  // 取消请求
  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setController(null);
    }
  };

  return (
    <div className="mb-10 rounded-lg border bg-gray-50 p-6">
      <h2 className="mb-4 text-xl font-bold">超时和重试示例</h2>

      <div className="mb-4 rounded bg-orange-100 p-2">
        <p className="mb-2">本示例演示请求超时和自动重试机制：</p>
        <ul className="list-disc pl-5">
          <li>慢速API接口响应时间为8秒</li>
          <li>{`"超时请求"设置为5秒超时，会触发超时错误`}</li>
          <li>{`"带重试的请求"基础超时为3秒，最多重试2次，超时时间随重试次数线性递增`}</li>
          <li>{`第1次重试超时时间为6秒(2倍)，第2次重试超时时间为9秒(3倍)`}</li>
          <li>{`点击"取消请求"可以随时中断正在进行的请求`}</li>
        </ul>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={handleTimeout}
          className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          disabled={loading}
        >
          {loading && !result.includes('重试') ? '请求中...' : '超时请求(5秒)'}
        </button>

        <button
          onClick={handleRetry}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          disabled={loading}
        >
          {loading && result.includes('重试')
            ? `重试中(${retryCount}/${maxRetries.current})...`
            : '带重试的请求'}
        </button>

        {loading && (
          <button
            onClick={handleCancelRequest}
            className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
          >
            取消请求 ({elapsedTime.toFixed(1)}秒)
          </button>
        )}
      </div>

      {loading && (
        <div className="mb-4">
          <p className="mb-1 text-blue-500">
            请求进行中{retryCount > 0 ? `，第${retryCount}次重试` : ''}...
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

export default TimeoutRetryExample;
