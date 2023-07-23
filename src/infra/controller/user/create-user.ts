import { CreateUserUseCase } from 'src/app/usecase/user/create-user';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDtoInfra } from 'src/infra/dto/create-user';

@ApiTags('User | criar nova conta')
@Controller('/users')
export class CreateUserController {
  constructor(private usecase: CreateUserUseCase) {}

  @Post()
  async handle(@Body() dto: CreateUserDtoInfra) {
    await this.usecase.execute(dto);
  }
}
