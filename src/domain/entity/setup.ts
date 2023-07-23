import { CreateSetupDto } from '../dto';
import { Description, FileUrl, ID } from '../types';

export class Setup {
  id: ID;
  userId: ID;
  photo: FileUrl;
  description: Description;

  constructor(dto: CreateSetupDto) {
    this.id = dto.id;
    this.userId = dto.userId;
    this.photo = dto.photo;
    this.description = dto.description;
  }

  static create(dto: Omit<CreateSetupDto, 'id'>) {
    return new Setup({
      id: -1,
      photo: dto.photo,
      userId: dto.userId,
      description: dto.description,
    });
  }
}
