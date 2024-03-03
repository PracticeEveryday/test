import { DynamicModule, Module } from '@nestjs/common';
import { LogService } from './log.service';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

const winstonOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env['NODE_ENV'] === 'prod' ? 'http' : 'info',
      format: winston.format.combine(
        winston.format.timestamp(), // timestamp를 찍을거고
        winston.format.ms(), // ms 단위로 찍을거야
        utilities.format.nestLike('Server', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
  ],
};

@Module({
  imports: [WinstonModule.forRoot(winstonOptions)],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: LogModule,
    };
  }
}
