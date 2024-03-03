import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogService {
  private readonly logger = Logger;

  debug(label: string, message: string, data: any = {}): void {
    this.logger.debug({ message, ...data }, label);
  }

  info(label: string, message: string, data: any = {}): void {
    this.logger.log({ message, ...data }, label);
  }

  error(label: string, error: Error): void {
    this.logger.error(
      error.name,
      [error.message, error.stack].join('\n'),
      label,
    );
  }

  warn(label: string, error: Error): void {
    this.logger.warn(error.name, error.stack, label);
  }
}
