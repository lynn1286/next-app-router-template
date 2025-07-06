'use client';

import { useTodoStore } from '@/providers/todo-store-provider';
import { useState } from 'react';

// 待办事项组件
const Todo = () => {
  const [newTodo, setNewTodo] = useState('');

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">待办事项列表</h2>
      <form onSubmit={handleAddTodo} className="mb-4 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="添加新的待办事项..."
          className="flex-grow rounded-l border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-r bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          添加
        </button>
      </form>

      <ul className="mb-4 max-h-60 space-y-2 overflow-y-auto">
        {todos.length === 0 ? (
          <li className="py-2 text-center text-gray-500">暂无待办事项</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border-b p-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-2"
                />
                <span
                  className={todo.completed ? 'text-gray-400 line-through' : ''}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </li>
          ))
        )}
      </ul>

      {todos.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span>{todos.filter((t) => !t.completed).length} 项待完成</span>
          <button
            onClick={clearCompleted}
            className="text-gray-500 hover:text-gray-700"
          >
            清除已完成
          </button>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-600">
        待办事项列表也会在页面刷新后保持不变，展示了 Zustand
        在复杂状态管理中的应用。
      </p>
    </div>
  );
};

export default Todo;
