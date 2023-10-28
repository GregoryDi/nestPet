import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { FilesService } from './files.service';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { StorageService } from './storage.service';
import { AdminOrUserAuthGuard } from '../../guards/admin-or-user-auth.guard';
import { FileDto } from '../../dtos/file.dto';
import { CreateFileDto } from '../../dtos/create-file.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Files')
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden.' })
@Serialize(FileDto)
@UseGuards(AdminOrUserAuthGuard)
@Controller('files')
export class FilesController {
  constructor(
    private filesService: FilesService,
    private storageService: StorageService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Uploaded file',
    type: CreateFileDto,
  })
  @ApiResponse({ status: 200, type: FileDto })
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    const id = uuidv4();

    const gscFile = await this.storageService.save(
      id,
      file.mimetype,
      file.buffer,
      [{ id: id }],
    );

    const savedFile = await this.filesService.create(
      file.mimetype,
      file.size,
      id,
    );

    return savedFile;
  }
}
