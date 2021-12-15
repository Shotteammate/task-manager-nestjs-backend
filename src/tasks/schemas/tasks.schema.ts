import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({ type: Boolean, default: false })
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
