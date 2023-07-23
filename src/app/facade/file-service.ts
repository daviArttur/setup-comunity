import { FileServiceFacade, SaveFileService } from '../contract';
import { SaveFileDto } from '../dto';

export class FileServiceNode implements FileServiceFacade {
  constructor(private saveFileService: SaveFileService) {}

  async save(dto: SaveFileDto) {
    return this.saveFileService.save(dto);
  }

  delete: () => Promise<any>;

  getFileExtension(fileName: string) {
    const lenght = fileName.split('.').length;

    return fileName.split('.')[lenght - 1];
  }
}
