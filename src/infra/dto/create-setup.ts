import { IsString, Length } from 'class-validator';

export class CreateSetupDtoInfra {
  @IsString()
  @Length(1, 1000)
  description: string;
}
