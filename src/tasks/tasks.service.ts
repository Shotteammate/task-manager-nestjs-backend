import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/tasks.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MongoDeleteOne } from 'src/users/interface/mongooseDeleteOne.interface';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find({});
  }

  async findOne(id: string): Promise<Task | undefined> {
    return await this.taskModel.findOne({ _id: id }).populate('owner');
  }

  async create(createTaskData: CreateTaskDto, owner: User): Promise<Task> {
    const createdTask = new this.taskModel({
      ...createTaskData,
      owner,
    });
    return createdTask.save();
  }

  async update(id: string, payload: UpdateTaskDto): Promise<Task | undefined> {
    const options = { new: true };
    return await this.taskModel
      .findOneAndUpdate({ _id: id }, payload, options)
      .populate('owner');
  }

  // typescrip interface 'MongoDeleteOne' is used to prevent 'Promise<Object>' situation
  // which cause 'typescript Don't use `Object` as a type.'
  async delete(id: string): Promise<MongoDeleteOne> {
    return await this.taskModel.deleteOne({ _id: id });
  }

  async deleteAll(id: ObjectId): Promise<MongoDeleteOne> {
    return await this.taskModel.deleteMany({ owner: id });
  }
}
