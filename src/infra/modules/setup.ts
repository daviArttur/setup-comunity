import { Module } from '@nestjs/common';
import { FindSetupsController } from '../controller/setup/find-setups';
import { FindSetupsUseCase } from 'src/app/usecase/setup/find-setups';
import { SaveSetupUseCase } from 'src/app/usecase/setup/save-setup';
import { SaveSetupController } from '../controller/setup/save-setup';
import { repositoryModulePrisma } from './repository';
import { SaveFileServiceNode } from 'src/app/service/save-file-service';
import { FileServiceNode } from 'src/app/facade/file-service';
import { CacheAdapterRedis } from '../adapter/cache/redis/cache-adapter-redis';
import { cacheModuleRedis } from './cache';
import { FilePathBuilder } from 'src/app/builder/file-path-builder';
import { UUIDService } from 'src/app/service/uuid-service';

@Module({
  controllers: [FindSetupsController, SaveSetupController],
  providers: [
    {
      provide: FindSetupsUseCase,
      useValue: new FindSetupsUseCase(
        repositoryModulePrisma.userRepository,
        new CacheAdapterRedis(cacheModuleRedis.redisClient),
        { key: 'all-setups', ttl: 100 },
      ),
    },
    {
      provide: SaveSetupUseCase,
      useValue: new SaveSetupUseCase(
        repositoryModulePrisma.userRepository,
        new FileServiceNode(new SaveFileServiceNode()),
        new FilePathBuilder(),
        new UUIDService(),
      ),
    },
  ],
})
export class SetupModule {}
