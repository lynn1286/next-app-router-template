import {
  __access_token__,
  __admin_authorization__,
} from '@/https/utils/constant';
import { isServerRendering } from '@/https/utils/is';
import { getCookie } from 'cookies-next/client';
import FetchWrapper from '.';
import checkStatus from './check-status';
import { logError, logRequest, logResponse } from './log';

// 创建FetchWrapper实例，设置基础配置
const fetchWrapper = new FetchWrapper({
  apiUrl: process.env.NEXT_PUBLIC_GO_API_URL,
  // 添加最大并发请求数
  maxConcurrent: 6,
  // 设置请求超时时间
  timeout: 20000,
  // 设置重试次数
  retries: 1,
  // 设置重试间隔
  retryInterval: 1000,
});

// 请求拦截器
fetchWrapper.interceptors.request.use(async ({ url, options }) => {
  // 是否携带自定义 header
  if (options._withHeader) {
    options.headers = options.headers || {};

    if (isServerRendering) {
      const { cookies } = await import('next/headers');
      const token = (await cookies()).get(__access_token__)?.value;

      if (token) {
        (options.headers as Record<string, string>)[__admin_authorization__] =
          token;
      }
    } else {
      const token = getCookie(__access_token__);

      if (token) {
        (options.headers as Record<string, string>)[__admin_authorization__] =
          token;
      }
    }
  }

  logRequest(url, options);
  return { url, options };
});

// 响应拦截器
fetchWrapper.interceptors.response.use(
  async (context) => {
    const { options, response } = context;

    if (options?._isReturnNativeResponse) {
      logResponse(response);
      return context;
    }

    if (!response.ok) {
      checkStatus(response.status);
    }

    try {
      // 克隆响应以记录日志
      const clonedResponse = response.clone();
      const data = await clonedResponse.json();
      logResponse(response, data);
    } catch {
      // 如果无法解析为JSON，仅记录响应状态
      logResponse(response);
    }

    return context;
  },
  ({ error }) => {
    logError(error as Error);
    return Promise.reject(error);
  },
);

export default fetchWrapper;
