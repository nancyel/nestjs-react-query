import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { IsParamMongoId } from 'src/decorators/mongo-id-param.decorator';
import { CreateTaskDto, UpdateTaskDto } from './dtos';
import { WorklogService } from './worklog.service';

@Controller('worklogs')
export class WorklogController {
  constructor(private readonly worklogService: WorklogService) {}
  @Post()
  async createATask(@Body() dto: CreateTaskDto) {
    return await this.worklogService.createATask(dto);
  }

  @Get()
  async getAll(
    @Query() query: { limit: string; createdAt: string; dir: string },
  ) {
    return await this.worklogService.getAll(query);
  }

  @Get('/:id')
  async getOne(@Param('id') @IsParamMongoId('id') id: string) {
    return await this.worklogService.getOne(id);
  }

  @Put('/:id')
  async updateOne(
    @Param('id') @IsParamMongoId('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return await this.worklogService.updateOne(id, dto);
  }
}
