import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSetupDtoInfra } from 'src/infra/dto/create-setup';
import { ControllerVoidMethod } from 'src/infra/contract';
import { SaveSetupUseCase } from 'src/app/usecase/setup/save-setup';

@ApiTags('User | criar novo setup')
@Controller('/setups')
export class SaveSetupController {
  constructor(private usecase: SaveSetupUseCase) {}

  @Post()
  async handle(@Body() dto: CreateSetupDtoInfra): ControllerVoidMethod {
    await this.usecase.execute(dto as any);
  }
}
