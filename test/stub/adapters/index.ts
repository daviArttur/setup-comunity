export class CacheAdapterStub {
  getStub() {
    return {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    };
  }
}

export const cacheConfigStub = {
  key: 'test',
  ttl: 100,
};
