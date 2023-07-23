import { Controller, Req, UseGuards } from '@nestjs/common';
import { GetUserDataDto } from 'src/app/dto';
import { MyRequest } from 'src/app/types';
import { GetUserDataUseCase } from 'src/app/usecase/user/get-user-data';
import { ControllerMethod } from 'src/infra/contract';
import { JwtAuthGuard } from 'src/infra/guard/jwt-auth';

@UseGuards(JwtAuthGuard)
@Controller()
export class GetUserDataController {
  constructor(private getUserDataUseCase: GetUserDataUseCase) {}

  async handle(@Req() req: MyRequest): ControllerMethod<GetUserDataDto> {
    return { data: await this.getUserDataUseCase.execute(req.user.userId) };
  }
}
