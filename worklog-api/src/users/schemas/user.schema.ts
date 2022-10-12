import { mongoose, prop } from '@typegoose/typegoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export class User {
  _id?: mongoose.Types.ObjectId;

  @prop({ required: true })
  username: string;

  @prop({ unique: true, sparse: true })
  email: string;

  @prop()
  customer?: string;

  @prop()
  defaultPaymentMethod?: string;

  @prop()
  currentRefreshToken?: string;

  passwordHash?: string;
}
