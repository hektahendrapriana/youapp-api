import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Post('createProfile')
  create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
    const userId = req.user['sub'];
    return this.usersService.create(userId, createUserDto);
    // return this.usersService.create(updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('getProfile')
  findById(@Req() req: Request) {
    const userId = req.user['sub'];
    return this.usersService.findById(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Put('updateProfile')
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user['sub'];
    return this.usersService.update(userId, updateUserDto);
  }

}