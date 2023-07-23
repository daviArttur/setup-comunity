import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ControllerMethod } from 'src/infra/contract';
import { Setup } from 'src/domain/entity/setup';
import { FindSetupsUseCase } from 'src/app/usecase/setup/find-setups';

@ApiTags('User | buscar setups')
@Controller('/setups')
export class FindSetupsController {
  constructor(private usecase: FindSetupsUseCase) {}

  @Get()
  async handle(): ControllerMethod<Setup[]> {
    return {
      data: await this.usecase.execute(),
    };
  }
}
