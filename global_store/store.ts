export class Store<T> {
  private data: T | null = null;
  private initialized = false;

  private constructor() {}

  private static instance: Store<any> | null = null;

  static getStore<T>(): Store<T> {
    if (!Store.instance) {
      throw new Error("Store not initialized. Call initialize() first.");
    }
    return Store.instance as Store<T>;
  }

  static initialize<T>(data: T): void {
    if (!Store.instance) {
      Store.instance = new Store<T>();
    }
    Store.instance.data = data;
    Store.instance.initialized = true;
  }

  get(): T {
    if (!this.initialized || this.data === null) {
      throw new Error("Store not initialized");
    }
    return this.data;
  }

  set(data: T): void {
    this.data = data;
    this.initialized = true;
  }
} 
