import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';

@Injectable()
export class FilesService {
  constructor(@InjectRepository(File) private repo: Repository<File>) {}

  create(contentType: string, contentLength: number, uuid: string) {
    const file = this.repo.create({
      contentType,
      contentLength,
      uuid,
    });

    return this.repo.save(file);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id } });
  }
}
