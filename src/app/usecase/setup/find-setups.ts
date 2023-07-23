import { CacheAdapter, CacheConfig } from 'src/app/contract';
import { UserRepository } from 'src/app/repository';

export class FindSetupsUseCase {
  constructor(
    private userRepository: UserRepository,
    private cacheAdapter: CacheAdapter,
    private cacheConfig: CacheConfig,
  ) {}

  async execute() {
    const setupsInCache = await this.cacheAdapter.get(this.cacheConfig);

    if (setupsInCache && setupsInCache[0]) {
      return setupsInCache;
    }

    const setupsOfDb = await this.userRepository.findSetups();

    await this.cacheAdapter.set(this.cacheConfig, setupsOfDb);

    return setupsOfDb;
  }
}
