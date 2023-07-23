import { GetUserDataDto } from 'src/app/dto';
import { UserNotFoundException } from 'src/app/errors/exceptions';
import { UserRepository } from 'src/app/repository';
import { ID } from 'src/domain/types';

export class GetUserDataUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: ID): Promise<GetUserDataDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    return {
      email: user.email,
      id: user.id,
      username: user.username,
    };
  }
}
