import { Redis } from 'ioredis';

export class CacheModuleRedis {
  redisClient: Redis;

  constructor() {
    const client = new Redis({
      host: process.env.REDIS_HOST,
      port: +6379,
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    client.ping();

    this.redisClient = client;
  }
}
export const cacheModuleRedis = new CacheModuleRedis();
