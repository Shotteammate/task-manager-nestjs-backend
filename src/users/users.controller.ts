import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): string {
    return 'get all users';
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
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
