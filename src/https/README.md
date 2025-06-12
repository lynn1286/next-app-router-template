# HTTP请求封装

这个目录包含了一个强大的HTTP请求封装，基于fetch API实现，提供了并发控制、重试机制、请求拦截等高级功能。

## 基本用法

```typescript
import fetchWrapper from '@/https/fetch-wrapper';

// 基本GET请求
const getUserData = async (userId: string) => {
  const userData = await fetchWrapper.get<UserData>(`/api/users/${userId}`);
  return userData;
};

// 带参数的POST请求
const createUser = async (userData: CreateUserData) => {
  const result = await fetchWrapper.post<CreateUserResponse>(
    '/api/users',
    userData,
  );
  return result;
};

// PUT请求
const updateUser = async (userId: string, userData: UpdateUserData) => {
  const result = await fetchWrapper.put<UpdateUserResponse>(
    `/api/users/${userId}`,
    userData,
  );
  return result;
};

// DELETE请求
const deleteUser = async (userId: string) => {
  const result = await fetchWrapper.delete<DeleteUserResponse>(
    `/api/users/${userId}`,
  );
  return result;
};
```

## 高级功能

### 请求优先级

可以设置请求的优先级，高优先级的请求会优先处理：

```typescript
// 高优先级请求
const getCriticalData = async () => {
  const data = await fetchWrapper.get('/api/critical-data', {
    _priority: 'high',
  });
  return data;
};

// 低优先级请求
const getBackgroundData = async () => {
  const data = await fetchWrapper.get('/api/background-data', {
    _priority: 'low',
  });
  return data;
};
```

### 超时和重试

可以设置请求超时和重试机制：

```typescript
// 自定义超时时间（毫秒）
const getDataWithTimeout = async () => {
  const data = await fetchWrapper.get('/api/data', { _timeout: 10000 }); // 10秒超时
  return data;
};

// 启用自动重试
const getDataWithRetry = async () => {
  const data = await fetchWrapper.get('/api/data', {
    _retryOnFail: true,
    _retries: 3,
    _retryInterval: 2000, // 每次重试间隔2秒
  });
  return data;
};
```

### 取消请求

可以使用AbortController来取消正在进行的请求：

```typescript
const fetchWithCancel = async () => {
  const controller = new AbortController();
  const { signal } = controller;

  // 5秒后自动取消请求
  setTimeout(() => controller.abort(), 5000);

  try {
    const data = await fetchWrapper.get('/api/slow-data', { signal });
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('请求已取消');
    }
    throw error;
  }
};
```

## 配置说明

在`fetch-wrapper.ts`中，我们已经配置了一些默认参数：

```typescript
const fetchWrapper = new FetchWrapper({
  apiUrl: process.env.NEXT_PUBLIC_GO_API_URL,
  maxConcurrent: 6, // 最大并发请求数
  timeout: 20000, // 20秒超时
  retries: 1, // 失败后重试1次
  retryInterval: 1000, // 重试间隔1秒
});
```

如果需要修改全局配置，可以在此文件中调整这些参数。

## TypeScript支持

所有API方法都支持泛型参数，可以指定返回数据的类型：

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (userId: string) => {
  const user = await fetchWrapper.get<User>(`/api/users/${userId}`);
  // user 已经被正确类型化为 User 类型
  console.log(user.name);
  return user;
};
```
