import {
  Body,
  Controller,
  Post,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { AuthService } from './auth.service';
import { ApiForbiddenResponse, ApiTags, ApiResponse } from '@nestjs/swagger';

import { AdminOrUserAuthGuard } from '../../guards/admin-or-user-auth.guard';
import { UserDto } from 'src/dtos/user.dto';

@ApiTags('Auth')
@ApiForbiddenResponse({ description: 'Forbidden.' })
@Controller('auth')
@ApiResponse({ status: 200, type: UserDto })
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AdminOrUserAuthGuard)
  // @Post('/signout')
  // signOut() {
  //   return false;
  // }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body.email, body.password);
    if (!user) {
      throw new NotFoundException('user not saved');
    }
    return { status: true };
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto) {
    const token = await this.authService.signin(body.email, body.password);
    return token;
  }
}
