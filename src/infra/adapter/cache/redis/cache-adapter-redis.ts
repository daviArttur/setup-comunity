import { CacheAdapter, CacheConfig } from 'src/app/contract';
import { Redis } from 'ioredis';

export class CacheAdapterRedis implements CacheAdapter {
  constructor(private redisClient: Redis) {}

  async get(CacheConfig: CacheConfig) {
    try {
      return await this.redisClient.get(CacheConfig.key);
    } catch (err) {
      return null;
    }
  }

  async delete(CacheConfig: CacheConfig) {
    try {
      await this.redisClient.del(CacheConfig.key);
    } catch (err) {
      // log
    }
  }

  async set(CacheConfig: CacheConfig, value: any) {
    try {
      await this.redisClient.set(CacheConfig.key, value);
    } catch (err) {
      // log
    }
  }
}
