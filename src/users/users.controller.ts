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
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoExceptionFilter } from '../common/exceptionFilters/mongoException.filter';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { MongoDeleteResponse } from './interface/mongooseDeleteResponse.interface';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: need admin role -> roleGuard
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  // catching MongoDB errors
  // ref: https://stackoverflow.com/questions/50864001/how-to-handle-mongoose-error-with-nestjs
  @UseFilters(MongoExceptionFilter)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserData: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Body() updateUserData: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.usersService.update(id, updateUserData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string): Promise<MongoDeleteResponse> {
    return this.usersService.delete(id);
  }
}
