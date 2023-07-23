import { CreateSetupDto, CreateUserDto } from 'src/domain/dto';

export const createUserDtoStub: CreateUserDto = {
  email: 'email',
  id: 21323,
  password: 'password',
  username: 'username',
};

export const createSetupDtoStub: CreateSetupDto = {
  id: 235262,
  photo: 'http://test',
  userId: 23405,
  description: 'description',
};
