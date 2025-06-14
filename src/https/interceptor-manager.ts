interface Interceptor<T, E = unknown> {
  fulfilled?: (value: T) => T | Promise<T>;
  rejected?: (params: { error: E; options: T }) => unknown;
}

class InterceptorManager<T, E = unknown> {
  private handlers: Array<Interceptor<T, E>> = [];

  use(
    fulfilled?: Interceptor<T, E>['fulfilled'],
    rejected?: Interceptor<T, E>['rejected'],
  ): void {
    this.handlers.push({
      fulfilled,
      rejected,
    });
  }

  async runHandlers(value: T): Promise<T> {
    for (const { fulfilled, rejected } of this.handlers) {
      try {
        if (fulfilled) {
          value = await fulfilled(value);
        }
      } catch (error) {
        if (rejected) {
          await rejected({ error: error as E, options: value });
        }
        throw error;
      }
    }
    return value;
  }
}

export default InterceptorManager;
