import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './infra/modules/user';
import { SetupModule } from './infra/modules/setup';
import { AuthModule } from './infra/modules/auth';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SetupModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
