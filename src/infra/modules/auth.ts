import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthStrategy } from '../strategy/jwt-auth';
import { PassportModule } from '@nestjs/passport';
import { AuthenticateUserUseCase } from 'src/app/usecase/user/authenticate-user';
import { repositoryModulePrisma } from './repository';
import { BcryptAdapter } from '../adapter/bcrypt-adapter';
import { JwtAdapter } from '../adapter/jwt-adapter';
import { LoginController } from '../controller/user/login';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    JwtAuthStrategy,
    {
      provide: AuthenticateUserUseCase,
      useValue: new AuthenticateUserUseCase(
        repositoryModulePrisma.userRepository,
        new BcryptAdapter(),
        new JwtAdapter(new JwtService()),
      ),
    },
  ],
  exports: [JwtAuthStrategy],
})
export class AuthModule {}
