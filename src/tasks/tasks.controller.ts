import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseFilters,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { MongoExceptionFilter } from 'src/common/exceptionFilters/mongoException.filter';
import { MongoDeleteOne } from 'src/users/interface/mongooseDeleteOne.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/tasks.schema';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  // catching MongoDB errors
  // ref: https://stackoverflow.com/questions/50864001/how-to-handle-mongoose-error-with-nestjs
  @Post()
  @UseFilters(MongoExceptionFilter)
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string): Promise<MongoDeleteOne> {
    return this.tasksService.delete(id);
  }
}
