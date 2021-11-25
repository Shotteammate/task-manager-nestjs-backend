import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017')],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
