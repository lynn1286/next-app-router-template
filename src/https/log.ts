import type { RequestOptions } from '.';

const isDevelopment = process.env.NEXT_PUBLIC_OPEN_LOG === 'true';

export const logRequest = (url: string, options: RequestOptions) => {
  if (!isDevelopment) return;

  console.log('🚀 Request ----------------');
  console.log('URL:', url);
  console.log('Headers:', options.headers);
  console.log('Method:', options.method);
  if (options.body) {
    console.log(
      'Body:',
      typeof options.body === 'string'
        ? JSON.parse(options.body)
        : options.body,
    );
  }
  console.log('---------------------------');
};

export const logResponse = (response: Response, data?: unknown) => {
  if (!isDevelopment) return;

  // 服务器端日志
  console.log('📨 Response ---------------');
  console.log('Status:', response.status);
  console.log('URL:', response.url);

  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  console.log('Headers:', headers);

  if (data) {
    console.log('Data:', data);
  }
  console.log('---------------------------');
};

export const logError = (error: Error) => {
  if (!isDevelopment) return;

  console.log('❌ Response Error ---------');
  console.error(error);
  console.log('---------------------------');
};
