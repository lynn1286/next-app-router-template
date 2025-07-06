'use client';

import Link from 'next/link';
import BasicExamples from '../components/basic-examples';
import CancelRequestExample from '../components/cancel-request-example';
import TimeoutRetryExample from '../components/timeout-retry-example';

export default function HttpsExamples() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">HTTP请求封装示例</h1>
        <p className="mb-2">
          这个页面展示了基于fetch API的HTTP请求封装的各种功能和用法。
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          返回首页
        </Link>
      </div>

      <BasicExamples />
      <TimeoutRetryExample />
      <CancelRequestExample />
    </div>
  );
}
