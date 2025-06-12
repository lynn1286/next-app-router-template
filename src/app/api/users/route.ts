import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { users } from './data';

export async function GET() {
  // 随机延迟，模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 500));

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  // 简单验证
  if (!data.name || !data.email) {
    return NextResponse.json(
      { error: '名称和邮箱是必填字段' },
      { status: 400 },
    );
  }

  // 创建新用户，使用 nanoid 生成唯一 ID
  const newUser = {
    id: nanoid(8), // 生成 8 位唯一 ID
    name: data.name,
    email: data.email,
  };

  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
