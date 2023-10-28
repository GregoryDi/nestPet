import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { UsersModule } from '../users/users.module';
import { AdminsController } from './admins.controller';

@Module({
  imports: [CommonModule, UsersModule],
  controllers: [AdminsController],
  providers: [],
  exports: [],
})
export class AdminsModule {}
