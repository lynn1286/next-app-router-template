import { nanoid } from 'nanoid';
import { createStore } from 'zustand/vanilla';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
}

export interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompleted: () => void;
}

export type TodoStore = TodoState & TodoActions;

export const defaultInitState: TodoState = {
  todos: [],
};

export const createTodoStore = (initState: TodoState = defaultInitState) => {
  return createStore<TodoStore>()((set) => ({
    ...initState,
    addTodo: (text) =>
      set((state) => ({
        todos: [...state.todos, { id: nanoid(), text, completed: false }],
      })),
    toggleTodo: (id) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      })),
    removeTodo: (id) =>
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      })),
    clearCompleted: () =>
      set((state) => ({
        todos: state.todos.filter((todo) => !todo.completed),
      })),
  }));
};
