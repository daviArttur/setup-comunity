import { Injectable } from '@nestjs/common';
import { FilePathBuilder } from 'src/app/builder/file-path-builder';
import { FileServiceFacade } from 'src/app/contract';
import { CreateSetupApp } from 'src/app/dto';
import { SetupAlreadyExistException } from 'src/app/errors/exceptions';
import { UserRepository } from 'src/app/repository';
import { UUIDService } from 'src/app/service/uuid-service';
import { Setup } from 'src/domain/entity/setup';

@Injectable()
export class SaveSetupUseCase {
  constructor(
    private userRepository: UserRepository,
    private fileService: FileServiceFacade,
    private filePathBuilder: FilePathBuilder,
    private randomUUID: UUIDService,
  ) {}

  async execute(dto: CreateSetupApp) {
    const setupAlreadyExist = await this.userRepository.findSetupByUserId(
      dto.userId,
    );

    if (setupAlreadyExist) {
      throw new SetupAlreadyExistException();
    }

    const imageUrl = await this.saveFileAndGetUrlToSaveInDatabase({
      image: dto.image,
      imageName: dto.imageName,
    });

    const setup = Setup.create({
      description: dto.description,
      photo: imageUrl,
      userId: dto.userId,
    });

    await this.userRepository.createSetup(setup);
  }

  private async saveFileAndGetUrlToSaveInDatabase(
    dto: Pick<CreateSetupApp, 'image' | 'imageName'>,
  ): Promise<string> {
    const fileExtension = this.fileService.getFileExtension(dto.imageName);

    this.filePathBuilder.append('/setups/');
    this.filePathBuilder.append(this.randomUUID.get());
    this.filePathBuilder.append(`.${fileExtension}`);

    const path = this.filePathBuilder.build();

    await this.fileService.save({
      file: dto.image,
      path: process.env.BASE_PATH_TO_SAVE_FILES_UPLOADED + path,
    });

    return path;
  }
}
