import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
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
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
