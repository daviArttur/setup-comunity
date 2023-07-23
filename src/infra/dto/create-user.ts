import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDtoInfra {
  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 30)
  username: string;

  @IsString()
  @Length(6, 30)
  password: string;
}
