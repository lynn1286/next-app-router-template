import { NextRequest, NextResponse } from 'next/server';
import { users } from '../data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  // 随机延迟，模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 300));

  const user = users.find((u) => u.id === params.id);

  if (!user) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const data = await request.json();
  const userIndex = users.findIndex((u) => u.id === params.id);

  if (userIndex === -1) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  // 更新用户数据
  users[userIndex] = {
    ...users[userIndex],
    ...data,
    id: params.id, // 确保ID不变
  };

  return NextResponse.json(users[userIndex]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const userIndex = users.findIndex((u) => u.id === params.id);

  if (userIndex === -1) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  // 从数组中删除用户
  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);

  return NextResponse.json({ message: '用户已删除', user: deletedUser });
}
