export class Cache {
  cache: {};

  constructor() {
    this.cache = {};
  }

  push(key, data) {
    this.cache[key] = data;
  }

  retrieve(key) {
    return this.cache[key];
  }
}
