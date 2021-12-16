import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

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

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: 'User' })
  owner: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
