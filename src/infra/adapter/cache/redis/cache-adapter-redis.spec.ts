import { RedisClientType } from 'redis';
import { CacheAdapterRedis } from './cache-adapter-redis';
import { CacheConfig } from 'src/app/contract';

describe('test CacheAdapterRedis', () => {
  let cacheAdapter: CacheAdapterRedis;

  let spy = {
    'connection.get': {} as jest.SpyInstance,
    'connection.del': {} as jest.SpyInstance,
    'connection.set': {} as jest.SpyInstance,
  };

  const cacheConfigStub: CacheConfig = {
    key: 'test',
    ttl: 1,
  };

  beforeEach(() => {
    const stub = {
      get: jest.fn(),
      del: jest.fn(),
      set: jest.fn(),
    } as any as RedisClientType;

    spy = {
      'connection.get': jest.spyOn(stub, 'get'),
      'connection.del': jest.spyOn(stub, 'del'),
      'connection.set': jest.spyOn(stub, 'set'),
    };

    cacheAdapter = new CacheAdapterRedis(stub as any);
  });

  describe('get', () => {
    it('should call redisClient.get with the provided key', async () => {
      spy['connection.get'].mockResolvedValue([{ mock: true }]);

      // Act
      const result = await cacheAdapter.get(cacheConfigStub);

      // Assert
      expect(result).toEqual([{ mock: true }]);
      expect(spy['connection.get']).toHaveBeenCalledWith(cacheConfigStub.key);
    });

    it('should return null when redis client throw an error', async () => {
      // Arrange
      spy['connection.get'].mockImplementation(() => {
        throw new Error();
      });

      // Act
      const result = await cacheAdapter.get(cacheConfigStub);

      // Assert
      expect(result).toBeNull();
      expect(spy['connection.get']).toHaveBeenCalledWith(cacheConfigStub.key);
    });
  });

  describe('delete', () => {
    it('should call redisClient.del with the provided key', async () => {
      // Act
      await cacheAdapter.set(cacheConfigStub, 'value');

      // Assert
      expect(spy['connection.set']).toHaveBeenCalledWith(
        cacheConfigStub.key,
        'value',
      );
    });

    it('should return undefined when redis client throw an error', async () => {
      // Arrange
      spy['connection.set'].mockImplementation(() => {
        throw new Error();
      });

      // Act
      const result = await cacheAdapter.set(cacheConfigStub, 100);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe('set', () => {
    it('should call redisClient.set with the provided key, value, and options', async () => {
      // Act
      await cacheAdapter.delete(cacheConfigStub);

      // Assert
      expect(spy['connection.del']).toHaveBeenCalledWith(cacheConfigStub.key);
    });
  });

  it('should return null when redis client throw an error', async () => {
    // Arrange
    spy['connection.del'].mockImplementation(() => {
      throw new Error();
    });

    // Act
    const result = await cacheAdapter.delete(cacheConfigStub);

    // Assert
    expect(result).toBeUndefined();
  });
});
