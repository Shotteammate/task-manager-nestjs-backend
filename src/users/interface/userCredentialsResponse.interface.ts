import { ObjectId } from 'mongoose';

export interface UserCredentialsResponse {
  readonly _id: ObjectId;
  readonly name: string;
  readonly email: string;
  readonly age: number;
}
