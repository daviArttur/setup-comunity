import { SaveFileDto } from '../dto';
export interface FileServiceFacade extends SaveFileService {
  //
  delete: () => Promise<any>;
  getFileExtension: (value: string) => string;
}

export interface CacheConfig {
  key: string;
  ttl: number;
}

export interface CacheAdapter {
  get: (conf: CacheConfig) => Promise<any>;
  set: (conf: CacheConfig, value: any) => Promise<void>;
  delete: (conf: CacheConfig) => Promise<void>;
}

export interface SaveFileService {
  save: (dto: SaveFileDto) => Promise<{ success: boolean }>;
}
