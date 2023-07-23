import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from 'src/app/usecase/user/authenticate-user';
import { LoginDtoInfra } from 'src/infra/dto/login';

@Controller('/login')
export class LoginController {
  constructor(private usecase: AuthenticateUserUseCase) {}

  @Post()
  async handle(@Body() dto: LoginDtoInfra) {
    await this.usecase.execute(dto);
  }
}
