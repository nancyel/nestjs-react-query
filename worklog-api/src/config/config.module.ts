import { Module } from '@nestjs/common';
import { ConfigManagerModule } from '@nestjsplus/config';
import { ConfigService } from './config.service';

@Module({
  imports: [
    ConfigManagerModule.register({
      useFile: `src/config/.env.${process.env.NODE_ENV}`,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
