import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseFilters,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoExceptionFilter } from '../common/exceptionFilters/mongoException.filter';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { MongoDeleteOne } from './interface/mongooseDeleteOne.interface';
import { UserCredentialsResponse } from './interface/userCredentialsResponse.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: need admin role -> roleGuard
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<UserCredentialsResponse> {
    return this.usersService.findOne(id);
  }

  // catching MongoDB errors
  // ref: https://stackoverflow.com/questions/50864001/how-to-handle-mongoose-error-with-nestjs
  @Post()
  @UseFilters(MongoExceptionFilter)
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserData: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserData);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Body() updateUserData: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.usersService.update(id, updateUserData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string): Promise<MongoDeleteOne> {
    return this.usersService.delete(id);
  }
}
