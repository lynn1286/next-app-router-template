import InterceptorManager from './interceptor-manager';

type Config = {
  timeout?: number; // 请求超时时间
  retries?: number; // 请求超时重试次数
  retryInterval?: number; // 添加重试间隔时间参数
  retryOnFail?: boolean; // 是否开启错误重试
  apiUrl?: string; // 基础URL
  withHeader?: boolean; // 是否携带自定义header
  isReturnNativeResponse?: boolean; // 是否返回原生响应
  maxConcurrent?: number; // 最大并发请求数
};

export interface RequestOptions extends RequestInit {
  _timeout?: number;
  _retries?: number;
  _retryInterval?: number;
  _retryOnFail?: boolean;
  _apiUrl?: string;
  _withHeader?: boolean;
  _isReturnNativeResponse?: boolean;
  _priority?: 'high' | 'normal' | 'low'; // 请求优先级
}

interface RequestContext {
  url: string;
  options: RequestOptions;
}

interface ResponseContext {
  response: Response;
  options: RequestOptions;
}

interface QueueItem {
  url: string;
  options: RequestOptions;
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  priority: number; // 0: high, 1: normal, 2: low
}

class FetchWrapper {
  private timeout: number;
  private retries: number;
  private apiUrl: string;
  private retryInterval: number;
  private retryOnFail: boolean;
  private withHeader: boolean;
  private isReturnNativeResponse: boolean;
  private maxConcurrent: number;

  // 请求队列
  private queue: QueueItem[] = [];
  // 当前活跃请求数
  private activeRequests: number = 0;

  public interceptors = {
    request: new InterceptorManager<RequestContext>(),
    response: new InterceptorManager<ResponseContext>(),
  };

  constructor(config: Config) {
    this.timeout = config.timeout || 30000; // 默认超时时间为30000毫秒
    this.retries = config.retries || 3; // 默认重试次数为3
    this.apiUrl = config.apiUrl || ''; // 如果没有配置baseURL，默认为空
    this.retryInterval = config.retryInterval || 1000; // 如果未设置，默认为1000毫秒
    this.retryOnFail = config.retryOnFail ?? false; // 初始化错误重试开关，默认值为 false
    this.withHeader = config.withHeader ?? true; // 是否携带请求头
    this.isReturnNativeResponse = config.isReturnNativeResponse ?? false; // 是否返回原生响应
    this.maxConcurrent = config.maxConcurrent || 6; // 默认同时最多6个请求（符合浏览器限制）
  }

  /**
   * 处理队列中的下一个请求
   */
  private processQueue(): void {
    // 如果没有待处理的请求或已达到最大并发数，则不处理
    if (this.queue.length === 0 || this.activeRequests >= this.maxConcurrent) {
      return;
    }

    // 根据优先级排序队列
    this.queue.sort((a, b) => a.priority - b.priority);

    // 取出队列头部的请求
    const item = this.queue.shift()!;
    this.activeRequests++;

    // 处理请求
    const { url, options, resolve, reject } = item;

    this.processFetch(url, options)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.activeRequests--;
        // 处理下一个请求
        this.processQueue();
      });
  }

  /**
   * 执行实际的fetch请求
   */
  private async processFetch<T>(
    resource: string,
    options: RequestOptions,
  ): Promise<T> {
    try {
      let response: Response;
      const shouldRetry = options._retryOnFail ?? this.retryOnFail;

      if (shouldRetry) {
        response = await this.retryFetch(resource, options);
      } else {
        response = await this.fetchWithTimeout(resource, options);
      }

      const responseContext: ResponseContext = {
        response,
        options,
      };

      const resolvedResponseContext =
        (await this.interceptors.response.runHandlers(responseContext)) ??
        responseContext;

      // 如果需要返回原生响应，直接返回
      if (options._isReturnNativeResponse) {
        return resolvedResponseContext.response as unknown as T;
      }

      // 处理JSON响应
      const data = (await resolvedResponseContext.response.json()) as T;
      return data;
    } catch (error) {
      console.error('[HTTP] Request failed:', error);
      throw error;
    }
  }

  private async fetchWithTimeout(resource: string, options: RequestOptions) {
    // 如果没有提供超时时间，使用默认值
    const timeout =
      options._timeout !== undefined ? options._timeout : this.timeout;

    // 保存用户传入的信号，这是用于手动取消的信号
    const userSignal = options.signal;

    // 为超时创建一个AbortController
    const timeoutController = new AbortController();
    const timeoutSignal = timeoutController.signal;
    const timeoutId = setTimeout(() => {
      console.log(`[HTTP] Request Timeout(${timeout}ms): ${resource}`);
      timeoutController.abort();
    }, timeout);

    // 组合两个信号，任何一个触发都会导致请求被中止
    // 如果用户没有提供信号，则只使用超时信号
    let combinedSignal: AbortSignal;
    if (!userSignal) {
      combinedSignal = timeoutSignal;
    } else if (typeof AbortSignal.any === 'function') {
      // 使用AbortSignal.any()组合信号（现代浏览器支持）
      combinedSignal = AbortSignal.any([userSignal, timeoutSignal]);
    } else {
      // 兼容性处理：手动处理两个信号
      const combinedController = new AbortController();
      combinedSignal = combinedController.signal;

      // 监听用户信号
      if (userSignal) {
        const userAbortHandler = () => {
          combinedController.abort();
        };
        userSignal.addEventListener('abort', userAbortHandler, { once: true });
      }

      // 监听超时信号
      const timeoutAbortHandler = () => {
        combinedController.abort();
      };
      timeoutSignal.addEventListener('abort', timeoutAbortHandler, {
        once: true,
      });
    }

    // 准备fetch选项，设置组合信号
    const fetchOptions = {
      ...options,
      signal: combinedSignal,
    };

    const finalResource = (options._apiUrl ?? this.apiUrl) + resource;

    try {
      const response = await fetch(finalResource, fetchOptions);

      // 清除超时定时器
      clearTimeout(timeoutId);

      return response;
    } catch (error) {
      // 清除超时定时器
      clearTimeout(timeoutId);

      if (error instanceof DOMException && error.name === 'AbortError') {
        // 检测是用户取消还是超时
        if (userSignal?.aborted) {
          console.log(`[HTTP] Request cancelled by user: ${resource}`);
          throw new Error('Request cancelled by user');
        } else {
          console.log(`[HTTP] Request Timeout: ${resource}`);
          throw new Error(`Request Timeout(${timeout}ms)`);
        }
      }

      console.error(
        `[HTTP] Network request error: ${(error as Error).message}`,
      );
      throw error;
    }
  }

  private async retryFetch(
    resource: string,
    options: RequestOptions,
  ): Promise<Response> {
    const maxRetries =
      options._retries !== undefined ? options._retries : this.retries;
    let interval =
      options._retryInterval !== undefined
        ? options._retryInterval
        : this.retryInterval;

    // 检查用户是否已经取消请求
    if (options.signal?.aborted) {
      throw new Error('Request cancelled by user');
    }

    // 创建一个独立的options对象，避免修改原始options
    const retryOptions = { ...options };
    const userSignal = options.signal;

    // 重试计数从0开始，0表示第一次尝试
    for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
      // 每次尝试前检查是否已被取消
      if (userSignal?.aborted) {
        throw new Error('Request cancelled by user');
      }

      try {
        // 使用fetchWithTimeout，它会正确处理用户信号和超时信号
        const response = await this.fetchWithTimeout(resource, retryOptions);

        // 检查响应状态
        if (!response.ok) {
          const status = response.status;

          // 特殊处理429响应，从响应头获取重试间隔
          if (status === 429 && response.headers.has('Retry-After')) {
            interval =
              parseInt(response.headers.get('Retry-After')!, 10) * 1000;
          }

          // 再次检查是否已被取消
          if (userSignal?.aborted) {
            throw new Error('Request cancelled by user');
          }

          // 还有重试次数剩余，继续重试
          if (retryCount < maxRetries) {
            try {
              // 等待指定时间后重试，同时检查是否被取消
              await this.delayWithSignal(
                interval,
                userSignal ? userSignal : undefined,
              );
              continue;
            } catch {
              // 如果等待被取消，说明用户取消了请求
              throw new Error('Request cancelled by user');
            }
          }

          // 没有重试次数了，返回最后一个错误响应
          return response;
        }

        // 成功响应，返回
        return response;
      } catch (error) {
        // 如果是取消错误，直接向上抛出
        if ((error as Error).message?.includes('cancelled')) {
          throw error;
        }

        // 检查是否已被取消
        if (userSignal?.aborted) {
          throw new Error('Request cancelled by user');
        }

        // 还有重试次数剩余，继续重试
        if (retryCount < maxRetries) {
          try {
            // 等待指定时间后重试，同时检查是否被取消
            await this.delayWithSignal(
              interval,
              userSignal ? userSignal : undefined,
            );
            continue;
          } catch {
            // 如果等待被取消，说明用户取消了请求
            throw new Error('Request cancelled by user');
          }
        }

        // 没有重试次数了，抛出最后捕获的错误
        throw error;
      }
    }

    // 理论上代码不会执行到这里
    throw new Error('Maximum retries exceeded');
  }

  /**
   * 创建一个可取消的延时Promise
   */
  private delayWithSignal(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      // 如果信号已经被中止，立即拒绝
      if (signal?.aborted) {
        return reject(new Error('Request cancelled by user'));
      }

      const timer = setTimeout(resolve, ms);

      // 如果提供了信号，添加abort事件监听器
      if (signal) {
        const abortHandler = () => {
          clearTimeout(timer);
          reject(new Error('Request cancelled by user'));
        };

        signal.addEventListener('abort', abortHandler, { once: true });
      }
    });
  }

  async request<T>(resource: string, options: RequestOptions = {}): Promise<T> {
    options._withHeader = options._withHeader ?? this.withHeader;
    options._isReturnNativeResponse =
      options._isReturnNativeResponse ?? this.isReturnNativeResponse;

    const requestContext: RequestContext = { url: resource, options };

    try {
      const resolvedRequestContext =
        (await this.interceptors.request.runHandlers(requestContext)) ??
        requestContext;

      // 转换优先级为数字
      const priorityMap = { high: 0, normal: 1, low: 2 };
      const priority = options._priority ? priorityMap[options._priority] : 1;

      // 将请求加入队列
      return new Promise<T>((resolve, reject) => {
        this.queue.push({
          url: resolvedRequestContext.url,
          options: resolvedRequestContext.options,
          resolve: resolve as (value: unknown) => void,
          reject,
          priority,
        });

        // 尝试处理队列
        this.processQueue();
      });
    } catch (error) {
      console.error('Request preparation failed:', error);
      throw error;
    }
  }

  // 封装 GET 方法
  async get<T>(
    resource: string,
    options: Omit<RequestOptions, 'method'> = {},
  ): Promise<T> {
    return this.request<T>(resource, { ...options, method: 'GET' });
  }

  // 封装 POST 方法
  async post<T>(
    resource: string,
    data: unknown,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
  ): Promise<T> {
    return this.request<T>(resource, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // 封装 PUT 方法
  async put<T>(
    resource: string,
    data: unknown,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
  ): Promise<T> {
    return this.request<T>(resource, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // 封装 DELETE 方法
  async delete<T>(
    resource: string,
    options: Omit<RequestOptions, 'method'> = {},
  ): Promise<T> {
    return this.request<T>(resource, { ...options, method: 'DELETE' });
  }
}

export default FetchWrapper;
