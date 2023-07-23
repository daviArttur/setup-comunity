import { CreateUserDto } from '../dto';
import { Email, ID, Password, Username } from '../types';

export class User {
  readonly id: ID;
  readonly email: Email;
  readonly username: Username;
  readonly password: Password;

  constructor(dto: CreateUserDto) {
    this.username = dto.username;
    this.password = dto.password;
    this.id = dto.id;
    this.email = dto.email;
  }

  public static create(dto: Omit<CreateUserDto, 'id'>) {
    return new User({
      email: dto.email,
      id: -1,
      password: dto.password,
      username: dto.username,
    });
  }
}
