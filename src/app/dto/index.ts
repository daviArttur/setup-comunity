import { CreateUserDto } from 'src/domain/dto';
import { Description, ID } from 'src/domain/types';

export type CreateUserDtoApp = Omit<CreateUserDto, 'id'>;

export interface CreateSetupApp {
  userId: ID;
  image: Buffer;
  imageName: string;
  description: Description;
}

export interface SaveFileDto {
  path: string;
  file: Buffer;
}

export interface CreateTokenDto {
  userId: ID;
  config: {
    expiresIn: number;
  };
}

export interface GetUserDataDto {
  email: string;
  id: number;
  username: string;
}
