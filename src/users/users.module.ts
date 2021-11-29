import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Module({
  imports: [
    // forFeatureAsync pre-save hook must implement before MongooseModule.forFeature()
    // need to create the schema pre save hook before compiling the model
    // https://stackoverflow.com/questions/49302226/mongoose-presave-not-triggering-bcrypt

    // bcrypt.hash(this['password'], 8); 8: Auto-gen a salt and hash
    // https://www.npmjs.com/package/bcryptjs
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('save', async function () {
            if (this.isModified('password')) {
              this['password'] = await bcrypt.hash(this['password'], 8);
            }
          });
          return schema;
        },
      },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
