import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FilesService } from '../files/files.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private filesService: FilesService,
  ) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id }, relations: ['image'] });
  }

  find(email: string) {
    return this.repo.find({ where: { email }, relations: ['image'] });
  }

  findByRole(role: string) {
    return this.repo.find({ where: { role } });
  }

  async update(id: number, attrs: Partial<User>, imageId: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (imageId) {
      const image = await this.filesService.findOne(imageId);

      user.image = image;
    }

    Object.assign(user, attrs);
    console.log(user);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
