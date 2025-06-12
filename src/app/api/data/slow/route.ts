import { NextResponse } from 'next/server';

// 延迟函数
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 慢速API接口，延迟8秒响应
export async function GET() {
  // 延迟8秒
  await delay(8000);

  // 返回数据
  return NextResponse.json({
    status: 'success',
    data: {
      message: '延迟8秒后的数据',
      timestamp: new Date().toISOString(),
    },
  });
}
