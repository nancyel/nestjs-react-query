import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Task } from './schemas/task.schema';
import { WorklogController } from './worklog.controller';
import { WorklogService } from './worklog.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: Task,
        schemaOptions: {
          timestamps: true,
        },
      },
    ]),
  ],
  controllers: [WorklogController],
  providers: [WorklogService],
})
export class WorklogModule {}
