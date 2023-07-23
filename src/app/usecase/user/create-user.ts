import { User } from 'src/domain/entity/user';
import { EncryptAdapter, UserRepository } from '../../repository';
import { CreateUserDtoApp } from '../../dto';
import { UserAlreadyExistException } from '../../errors/exceptions';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private encryptAdapter: EncryptAdapter,
  ) {}

  async execute(dto: CreateUserDtoApp) {
    const userAlreadyExist = await this.userRepository.findByEmail(dto.email);

    if (userAlreadyExist) {
      throw new UserAlreadyExistException();
    }

    const encryptPassword = await this.encryptAdapter.encrypt(dto.password);

    const user = User.create({
      email: dto.email,
      password: encryptPassword,
      username: dto.username,
    });

    await this.userRepository.create(user);
  }
}
