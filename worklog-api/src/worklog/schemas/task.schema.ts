import { modelOptions, mongoose, prop, Severity } from '@typegoose/typegoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

export enum TaskType {
  FEATURE = 'feature',
  BUGFIX = 'bugfix',
  REFACTOR = 'refactor',
  TESTING = 'testing',
  DISCUSSION = 'discussion',
  SECURITY = 'security',
  MEETING = 'meeting',
  DOCS = 'docs',
  CHORE = 'chore',
}

export enum TaskStatus {
  INIT = 'INIT',
  WORKING = 'WORKING',
  DONE = 'DONE',
  PAUSE = 'PAUSE',
  STUCK = 'STUCK',
}

export class QueueItem {
  @prop({ required: true })
  description: string;

  @prop({ required: true })
  priority: number;

  @prop({ required: true })
  taskType: TaskType;

  @prop({ required: true, default: TaskStatus.INIT })
  status: TaskStatus;
}

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Task {
  _id?: mongoose.Types.ObjectId;

  @prop({ required: true, default: [] })
  queues: QueueItem[];

  createdAt: string;
  updatedAt: string;

  public dateString() {
    return new Date(this.createdAt).toISOString();
  }
}
