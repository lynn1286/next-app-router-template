import { createStore } from 'zustand/vanilla';

export interface CounterState {
  count: number;
}

export interface CounterActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export type CounterStore = CounterState & CounterActions;

export const defaultInitState: CounterState = {
  count: 0,
};

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
  }));
};
