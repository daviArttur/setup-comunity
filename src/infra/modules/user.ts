import { Module } from '@nestjs/common';
import { CreateUserController } from '../controller/user/create-user';
import { CreateUserUseCase } from 'src/app/usecase/user/create-user';
import { repositoryModulePrisma } from './repository';
import { BcryptAdapter } from '../adapter/bcrypt-adapter';
import { GetUserDataController } from '../controller/user/get-user-data';
import { GetUserDataUseCase } from 'src/app/usecase/user/get-user-data';

@Module({
  controllers: [CreateUserController, GetUserDataController],
  providers: [
    {
      provide: GetUserDataUseCase,
      useValue: new GetUserDataUseCase(repositoryModulePrisma.userRepository),
    },
    {
      provide: CreateUserUseCase,
      useValue: new CreateUserUseCase(
        repositoryModulePrisma.userRepository,
        new BcryptAdapter(),
      ),
    },
  ],
})
export class UserModule {}
