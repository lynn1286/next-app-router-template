'use client';

import { useState } from 'react';
import {
  UserStoreProvider,
  useUserStore,
} from '../../../providers/user-store-provider';

// 用户管理组件
const UserManagementComponent = () => {
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    language: 'zh-CN',
  });

  // 从 store 获取状态和方法
  const {
    users,
    currentUser,
    addUser,
    removeUser,
    setCurrentUser,
    updateUserPreference,
    resetUsers,
  } = useUserStore((state) => ({
    users: state.users,
    currentUser: state.currentUser,
    addUser: state.addUser,
    removeUser: state.removeUser,
    setCurrentUser: state.setCurrentUser,
    updateUserPreference: state.updateUserPreference,
    resetUsers: state.resetUsers,
  }));

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) return;

    addUser({
      name: formData.name,
      email: formData.email,
      preferences: {
        theme: 'light',
        notifications: true,
        language: formData.language,
      },
    });

    // 重置表单
    setFormData({
      name: '',
      email: '',
      language: 'zh-CN',
    });
  };

  // 处理输入变化
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 切换用户主题
  const toggleTheme = (userId: string, currentTheme: 'light' | 'dark') => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateUserPreference(userId, 'theme', newTheme);
  };

  // 切换通知设置
  const toggleNotifications = (userId: string, currentValue: boolean) => {
    updateUserPreference(userId, 'notifications', !currentValue);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* 用户表单 */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">添加新用户</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2 block text-gray-700" htmlFor="name">
                姓名
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="请输入姓名"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-gray-700" htmlFor="email">
                邮箱
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="请输入邮箱"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-gray-700" htmlFor="language">
                语言
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="zh-CN">中文</option>
                <option value="en-US">英文</option>
                <option value="ja-JP">日文</option>
                <option value="ko-KR">韩文</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              添加用户
            </button>
          </form>

          <div className="mt-4 flex justify-end">
            <button
              onClick={resetUsers}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              重置所有用户
            </button>
          </div>
        </div>

        {/* 当前用户详情 */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">当前用户详情</h2>

          {currentUser ? (
            <div>
              <div className="mb-4 rounded bg-gray-50 p-4">
                <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>

              <h4 className="mb-2 font-semibold">偏好设置</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>主题</span>
                  <button
                    onClick={() =>
                      toggleTheme(currentUser.id, currentUser.preferences.theme)
                    }
                    className={`rounded px-3 py-1 ${
                      currentUser.preferences.theme === 'dark'
                        ? 'bg-gray-800 text-white'
                        : 'bg-yellow-400 text-gray-800'
                    }`}
                  >
                    {currentUser.preferences.theme === 'dark'
                      ? '🌙 深色'
                      : '☀️ 浅色'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>通知</span>
                  <button
                    onClick={() =>
                      toggleNotifications(
                        currentUser.id,
                        currentUser.preferences.notifications,
                      )
                    }
                    className={`rounded px-3 py-1 ${
                      currentUser.preferences.notifications
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-800'
                    }`}
                  >
                    {currentUser.preferences.notifications
                      ? '已开启'
                      : '已关闭'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>语言</span>
                  <span className="rounded bg-gray-100 px-3 py-1">
                    {currentUser.preferences.language === 'zh-CN'
                      ? '中文'
                      : currentUser.preferences.language === 'en-US'
                        ? '英文'
                        : currentUser.preferences.language === 'ja-JP'
                          ? '日文'
                          : '韩文'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="py-8 text-center text-gray-500">
              请从下方列表选择一个用户
            </p>
          )}
        </div>
      </div>

      {/* 用户列表 */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">用户列表</h2>

        {users.length === 0 ? (
          <p className="py-8 text-center text-gray-500">暂无用户数据</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    姓名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    邮箱
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    主题
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    通知
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    语言
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 ${currentUser?.id === user.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.preferences.theme === 'dark'
                            ? 'bg-gray-800 text-white'
                            : 'bg-yellow-200 text-yellow-800'
                        }`}
                      >
                        {user.preferences.theme === 'dark' ? '深色' : '浅色'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.preferences.notifications
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.preferences.notifications ? '开启' : '关闭'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.preferences.language === 'zh-CN'
                        ? '中文'
                        : user.preferences.language === 'en-US'
                          ? '英文'
                          : user.preferences.language === 'ja-JP'
                            ? '日文'
                            : '韩文'}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                      <button
                        onClick={() => setCurrentUser(user.id)}
                        className="mr-4 text-blue-600 hover:text-blue-900"
                      >
                        选择
                      </button>
                      <button
                        onClick={() => removeUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

// 主页面
export default function AdvancedZustandPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Zustand 高级示例 - 用户管理
      </h1>

      <UserStoreProvider>
        <UserManagementComponent />
      </UserStoreProvider>

      {/* Zustand 中间件说明 */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Zustand 中间件</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">immer 中间件</h3>
            <p className="text-sm text-gray-600">
              允许以可变的方式编写状态更新逻辑，但在底层使用不可变更新。简化了复杂嵌套状态的更新，如本例中的用户偏好设置。
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">persist 中间件</h3>
            <p className="text-sm text-gray-600">
              将状态持久化到 localStorage
              或其他存储中，使应用在刷新后仍能保持状态。本例中用户数据在页面刷新后仍然存在。
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">devtools 中间件</h3>
            <p className="text-sm text-gray-600">
              连接 Redux DevTools，方便调试和状态追踪。打开浏览器开发者工具的
              Redux 面板，可以看到本应用的状态变化。
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          Next.js 中使用 Zustand 的最佳实践
        </h2>
        <p className="mb-4">
          在 Next.js 应用中，特别是使用 App Router 时，应该遵循以下最佳实践：
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            使用 <code>createStore</code> 和 <code>useStore</code>{' '}
            而不是直接使用 <code>create</code> hook
          </li>
          <li>通过 Context 提供 store，而不是全局导出 store</li>
          <li>在组件级别隔离 store，确保不同请求之间不共享状态</li>
          <li>React Server Components 不应该直接使用 Zustand store</li>
          <li>对于需要服务器端渲染的数据，考虑使用 Next.js 的数据获取机制</li>
        </ul>
      </div>
    </div>
  );
}
