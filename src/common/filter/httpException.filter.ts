import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { LogService } from '../../libs/log/log.service';
import { HttpAdapterHost } from '@nestjs/core';
import { BaseException } from './exception/base.exception';
import { ErrorTypeEnum } from '../enum/errorType.enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logService: LogService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(error: unknown, host: ArgumentsHost): any {
    const exception = (() => {
      if (error instanceof BaseException) {
        return error;
      }

      if (error instanceof HttpException) {
        return new BaseException({
          message: error.message,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          stack: error.stack,
        });
      }

      let lastError = error as Error;
      return new BaseException({
        message: lastError.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        stack: lastError.stack,
      });
    })();

    exception.errorType === ErrorTypeEnum.ERROR ? this.logService.error('error', exception) : this.logService.warn('warn', exception);

    this.httpAdapterHost.httpAdapter.reply((() => host.switchToHttp().getResponse())(), exception.getResponse(), exception.getStatus());
  }
}
