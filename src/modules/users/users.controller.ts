import {
  Body,
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { UserDto } from '../../dtos/user.dto';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { User } from './user.entity';
import {
  ApiForbiddenResponse,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UserAuthGuard } from '../../guards/user-auth.guard';
import { AdminOrUserAuthGuard } from '../../guards/admin-or-user-auth.guard';
import { AdminAuthGuard } from '../../guards/admin-auth.guard';
import { CurrentUserDto } from 'src/dtos/current-user.dto';
import { MailService } from '../common/mail.service';

@ApiTags('Users')
@ApiForbiddenResponse({ description: 'Forbidden.' })
@ApiBearerAuth()
@Controller('users')
@Serialize(UserDto)
@UseGuards(AdminOrUserAuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  @Get('/whoami')
  @ApiResponse({ status: 200, type: UserDto })
  async whoAmI(@CurrentUser() currentUser: CurrentUserDto) {
    const user = await this.usersService.findOne(currentUser.id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: UserDto })
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  @ApiResponse({ status: 200, type: [UserDto] })
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, type: UserDto })
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, type: UserDto })
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(parseInt(id), body, body.imageId);
  }
}
