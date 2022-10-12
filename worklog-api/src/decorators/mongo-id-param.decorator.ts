import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { mongoose } from '@typegoose/typegoose';

/**
 * req.param must exist
 * Mongoose ID
 */
export const IsParamMongoId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const reqData = req.params[data];
    if (!reqData) {
      throw new BadRequestException(`param: ${data} should not be empty`);
    }
    if (!mongoose.Types.ObjectId.isValid(reqData)) {
      throw new BadRequestException(`param: ${data} is not valid objectId`);
    }
  },
);
