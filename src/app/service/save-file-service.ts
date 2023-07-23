import * as nodePromises from 'fs/promises';
import { SaveFileDto } from '../dto';
import { SaveFileService } from '../contract';

export class SaveFileServiceNode implements SaveFileService {
  async save({ file, path }: SaveFileDto) {
    try {
      await nodePromises.writeFile(path, file);

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
      };
    }
  }
}
