'use client';

import fetchWrapper from '@/https/fetch-wrapper';
import { useState } from 'react';
import {
  CreateUserData,
  CreateUserResponse,
  DeleteUserResponse,
  UpdateUserData,
  UpdateUserResponse,
  User,
} from '../api/users/user';

// 基本请求示例组件
const BasicExamples = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [initialMessage, setInitialMessage] =
    useState('点击"获取所有用户"按钮开始演示');

  // 基本GET请求
  const handleGetUsers = async () => {
    setLoading(true);
    setError('');
    setInitialMessage('');
    setResult('请求中...');
    try {
      const userData = await fetchWrapper.get<User[]>('/api/users');
      setUsers(userData);
      setResult(JSON.stringify(userData, null, 2));
      return userData; // 返回获取的数据，以便其他函数可以使用
    } catch (err) {
      setError((err as Error).message);
      throw err; // 抛出错误，以便调用者可以处理
    } finally {
      setLoading(false);
    }
  };

  // 获取单个用户
  const handleGetUser = async (userId: string) => {
    setLoading(true);
    setError('');
    setInitialMessage('');
    setResult('获取用户详情中...');
    try {
      const userData = await fetchWrapper.get<User>(`/api/users/${userId}`);
      setSelectedUser(userData);
      setResult(JSON.stringify(userData, null, 2));
      return userData; // 返回获取的数据
    } catch (err) {
      setError((err as Error).message);
      throw err; // 抛出错误
    } finally {
      setLoading(false);
    }
  };

  // 创建用户
  const handleCreateUser = async () => {
    setLoading(true);
    setError('');
    setInitialMessage('');
    setResult('创建新用户中...');
    try {
      const newUser: CreateUserData = {
        name: `新用户-${Date.now().toString().slice(-4)}`,
        email: `user${Date.now().toString().slice(-4)}@example.com`,
      };

      const result = await fetchWrapper.post<CreateUserResponse>(
        '/api/users',
        newUser,
      );
      setResult(JSON.stringify(result, null, 2));
      // 刷新用户列表
      await handleGetUsers();
      // 选中新创建的用户
      if (result && result.id) {
        handleGetUser(result.id);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // 更新用户
  const handleUpdateUser = async () => {
    if (!selectedUser) {
      setError('请先选择一个用户');
      return;
    }

    setLoading(true);
    setError('');
    setInitialMessage('');
    setResult('更新用户中...');
    try {
      const updateData: UpdateUserData = {
        name: `${selectedUser.name}-已更新`,
      };

      const result = await fetchWrapper.put<UpdateUserResponse>(
        `/api/users/${selectedUser.id}`,
        updateData,
      );

      setResult(JSON.stringify(result, null, 2));
      // 刷新用户列表和选中用户
      await handleGetUsers();
      await handleGetUser(selectedUser.id);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // 删除用户
  const handleDeleteUser = async () => {
    if (!selectedUser) {
      setError('请先选择一个用户');
      return;
    }

    setLoading(true);
    setError('');
    setInitialMessage('');
    setResult('删除用户中...');
    try {
      const result = await fetchWrapper.delete<DeleteUserResponse>(
        `/api/users/${selectedUser.id}`,
      );

      setResult(JSON.stringify(result, null, 2));
      setSelectedUser(null);
      // 刷新用户列表
      await handleGetUsers();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10 rounded-lg border bg-gray-50 p-6">
      <h2 className="mb-4 text-xl font-bold">基本请求示例</h2>

      <div className="mb-4 rounded bg-blue-100 p-2">
        <p>操作步骤：</p>
        <ol className="list-decimal pl-5">
          <li>{`点击"获取所有用户"加载用户列表`}</li>
          <li>{`点击列表中的用户查看详情`}</li>
          <li>{`使用"创建用户"、"更新选中用户"或"删除选中用户"按钮进行操作`}</li>
        </ol>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={handleGetUsers}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          disabled={loading}
        >
          {loading && users.length === 0 ? '加载中...' : '获取所有用户'}
        </button>

        <button
          onClick={handleCreateUser}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          disabled={loading}
        >
          {loading && result.includes('创建') ? '创建中...' : '创建用户'}
        </button>

        <button
          onClick={handleUpdateUser}
          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
          disabled={loading || !selectedUser}
        >
          {loading && result.includes('更新') ? '更新中...' : '更新选中用户'}
        </button>

        <button
          onClick={handleDeleteUser}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          disabled={loading || !selectedUser}
        >
          {loading && result.includes('删除') ? '删除中...' : '删除选中用户'}
        </button>
      </div>

      {loading && <p className="text-blue-500">请求进行中，请稍候...</p>}
      {error && <p className="text-red-500">错误: {error}</p>}

      <div className="mt-4 flex gap-4">
        <div className="flex-1">
          <h3 className="mb-2 font-bold">用户列表</h3>
          {users.length > 0 ? (
            <ul className="rounded border bg-white p-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`cursor-pointer p-2 hover:bg-gray-100 ${
                    selectedUser?.id === user.id ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => handleGetUser(user.id)}
                >
                  {user.name} ({user.email})
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex h-[200px] items-center justify-center rounded border bg-white p-2">
              {loading
                ? '加载用户数据中...'
                : '暂无用户数据，请点击"获取所有用户"按钮'}
            </p>
          )}
        </div>

        <div className="flex-1">
          <h3 className="mb-2 font-bold">结果</h3>
          <pre className="h-[200px] overflow-auto rounded border bg-white p-2">
            {initialMessage || result || '暂无结果'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default BasicExamples;
