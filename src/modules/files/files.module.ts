import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { File } from './file.entity';
import { StorageService } from './storage.service';
import { ImgproxyService } from './imgproxy.service';
import { FileSubscriber } from './file.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FilesController],
  providers: [FilesService, StorageService, ImgproxyService, FileSubscriber],
  exports: [FilesService],
})
export class FilesModule {}
