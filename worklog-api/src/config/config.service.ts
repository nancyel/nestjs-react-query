import { Injectable } from '@nestjs/common';
import { ConfigManager } from '@nestjsplus/config';
import * as Joi from '@hapi/joi';

@Injectable()
export class ConfigService extends ConfigManager {
  public provideConfigSpec() {
    return {
      NODE_ENV: {
        validate: Joi.string(),
        required: true,
        default: 'local',
        valid: ['local', 'development', 'staging', 'production', 'test'],
      },
      PORT: {
        validate: Joi.number(),
        required: true,
      },
      DB_URL: {
        validate: Joi.string(),
        required: true,
      },
      JWT_SECRET: {
        validate: Joi.string(),
        required: true,
      },
      JWT_EXPIRATION_TIME: {
        validate: Joi.number(),
        required: true,
      },
    };
  }

  public DB_URL(): string {
    return this.get<string>('DB_URL');
  }

  public JWT_SECRET(): string {
    return this.get<string>('JWT_SECRET');
  }

  public JWT_EXPIRATION_TIME(): string {
    return this.get<string>('JWT_EXPIRATION_TIME');
  }

  public isProduction() {
    return process.env.NODE_ENV === 'production';
  }

  public isDevelopment() {
    return process.env.NODE_ENV === 'development';
  }

  public isLocal() {
    return process.env.NODE_ENV === 'local';
  }

  public isTest() {
    return process.env.NODE_ENV === 'test';
  }
}
