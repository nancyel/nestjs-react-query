import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { TaskType, TaskStatus } from '..';

export class QueueDto {
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly priority: number;

  @IsEnum(TaskType, {
    message: `taskType must be a valid enum value; please select one of ${Object.values(
      TaskType,
    ).join(', ')}`,
  })
  readonly taskType: TaskType;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: `status must be a valid enum value; please select one of ${Object.values(
      TaskStatus,
    ).join(', ')}`,
  })
  readonly status: TaskStatus = TaskStatus.INIT;
}
