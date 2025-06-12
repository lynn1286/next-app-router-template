import { createStore } from 'zustand/vanilla';

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
  };
}

export interface UserState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserActions {
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<Omit<User, 'id'>>) => void;
  removeUser: (id: string) => void;
  setCurrentUser: (id: string) => void;
  updateUserPreference: <K extends keyof User['preferences']>(
    userId: string,
    key: K,
    value: User['preferences'][K],
  ) => void;
  resetUsers: () => void;
}

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,

    addUser: (user) =>
      set((state) => {
        const newUser = {
          ...user,
          id: Date.now().toString(),
        };
        return {
          users: [...state.users, newUser],
        };
      }),

    updateUser: (id, updates) =>
      set((state) => {
        const userIndex = state.users.findIndex((user: User) => user.id === id);
        if (userIndex === -1) return state;

        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          ...updates,
        };

        const updatedState: Partial<UserState> = { users: updatedUsers };

        // 如果更新的是当前用户，也更新 currentUser
        if (state.currentUser?.id === id) {
          updatedState.currentUser = updatedUsers[userIndex];
        }

        return updatedState;
      }),

    removeUser: (id) =>
      set((state) => {
        const updatedUsers = state.users.filter((user: User) => user.id !== id);

        const updatedState: Partial<UserState> = { users: updatedUsers };

        // 如果删除的是当前用户，重置 currentUser
        if (state.currentUser?.id === id) {
          updatedState.currentUser = null;
        }

        return updatedState;
      }),

    setCurrentUser: (id) =>
      set((state) => {
        const user = state.users.find((user: User) => user.id === id);
        return user ? { currentUser: user } : state;
      }),

    updateUserPreference: (userId, key, value) =>
      set((state) => {
        const userIndex = state.users.findIndex(
          (user: User) => user.id === userId,
        );
        if (userIndex === -1) return state;

        const updatedUsers = [...state.users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          preferences: {
            ...updatedUsers[userIndex].preferences,
            [key]: value,
          },
        };

        const updatedState: Partial<UserState> = { users: updatedUsers };

        // 如果更新的是当前用户，也更新 currentUser
        if (state.currentUser?.id === userId) {
          updatedState.currentUser = updatedUsers[userIndex];
        }

        return updatedState;
      }),

    resetUsers: () => set(defaultInitState),
  }));
};
