import { Description, Email, FileUrl, ID, Password, Username } from '../types';

export interface CreateUserDto {
  id: ID;
  username: Username;
  email: Email;
  password: Password;
}

export interface CreateSetupDto {
  id: ID;
  userId: ID;
  photo: FileUrl;
  description: Description;
}
