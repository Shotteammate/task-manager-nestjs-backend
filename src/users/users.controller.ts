import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'get all users';
  }

  @Post()
  createUser(): string {
    return 'create user';
  }

  @Put()
  updateUser(): string {
    return 'update user';
  }

  @Delete()
  deleteUser(): string {
    return 'delete user';
  }
}
