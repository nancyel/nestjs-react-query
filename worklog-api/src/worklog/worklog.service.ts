import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTaskDto, QueueDto, UpdateTaskDto } from './dtos';
import { Task } from './schemas/task.schema';

@Injectable()
export class WorklogService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: ReturnModelType<typeof Task>,
  ) {}

  async getAll({ limit, createdAt, dir }) {
    const pageSize = limit ? parseInt(limit) : undefined;
    let findQuery: Record<string, any> = {};
    if (createdAt) {
      const filter =
        parseInt(dir) === 1
          ? { $gte: new Date(createdAt).toISOString() }
          : { $lte: new Date(createdAt).toISOString() };
      findQuery = { createdAt: filter };
    }
    // pagination: sort asc (1) for next, desc (-1) for prev
    const result = await this.taskModel
      .find(findQuery, {}, { sort: { createdAt: parseInt(dir) } })
      .limit(pageSize);

    return result.sort((a: { createdAt: string }, b: { createdAt: string }) =>
      a.createdAt > b.createdAt ? 1 : -1,
    );
  }

  async getOne(_id: string) {
    const worklog = await this.taskModel.findOne({ _id });
    if (!worklog) {
      throw new NotFoundException();
    }
    return worklog;
  }

  async updateOne(_id: string, { queues }: UpdateTaskDto) {
    const worklog = await this.getOne(_id);

    const sortedQueue = this.compareTaskPriority(queues);

    worklog.queues = sortedQueue;
    const updatedWorklog = await worklog.save();
    return updatedWorklog;
  }

  async createATask({ queues }: CreateTaskDto) {
    const now = new Date().toISOString();
    const existing = await this.taskModel
      .findOne({
        createdAt: { $lte: now },
      })
      .sort({ createdAt: -1 });

    if (existing) {
      if (this.shouldUpdateExisting(now, existing.dateString())) {
        return await existing.updateOne({
          $push: { queues: { $each: queues, $sort: { priority: 1 } } },
          updatedAt: now,
        });
      }
    }
    const sortedQueue = this.compareTaskPriority(queues);
    const payload = {
      queues: sortedQueue,
    };
    const savingTask = await this.taskModel.create(payload);
    return await savingTask.save();
  }

  private compareTaskPriority(array: QueueDto[]) {
    return array.sort((a, b) => (a.priority > b.priority ? 1 : -1));
  }

  private shouldUpdateExisting(newDate: string, existingDate: string) {
    return newDate.split('T')[0] === existingDate.split('T')[0];
  }
}
