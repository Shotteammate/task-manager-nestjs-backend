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
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { MongoExceptionFilter } from 'src/common/exceptionFilters/mongoException.filter';
import { MongoDeleteOne } from 'src/users/interface/mongooseDeleteOne.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/tasks.schema';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // TODO: can only be accessed by admin role
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  // catching MongoDB errors
  // ref: https://stackoverflow.com/questions/50864001/how-to-handle-mongoose-error-with-nestjs
  @UseGuards(JwtAuthGuard)
  @UseFilters(MongoExceptionFilter) //TODO: add error handling for owner true
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(
    @Body() createTaskData: CreateTaskDto,
    @Request() req,
  ): Promise<Task> {
    const { user } = req; // user comes from JwtAuthGuard
    return this.tasksService.create(createTaskData, user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateTask(
    @Body() updateTaskData: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteTask(@Param('id') id: string): Promise<MongoDeleteOne> {
    return this.tasksService.delete(id);
  }
}
