import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PASSWORD_MIN_LENGTH_ERR_MSG } from 'src/common/constants/errorMessages';
import { PASSWORD_LENGTH } from '../constants';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({ type: Number, default: 0 })
  age: number;

  @Prop({
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: [PASSWORD_LENGTH, PASSWORD_MIN_LENGTH_ERR_MSG],
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
