import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDtoInfra {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  password: string;
}
