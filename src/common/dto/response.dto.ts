import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @Exclude() private readonly _data?: T;
  @Exclude() private readonly _message: string = '';

  constructor(options?: { data?: T; message?: string }) {
    if (options && options.data) this._data = options?.data;
    if (options && options.message) this._message = options?.message;
  }

  static OK<T>(data?: T, message?: string): ResponseDto<T> {
    return new ResponseDto<T>({ data, message });
  }

  static CREATED<T>(data?: T, message?: string): ResponseDto<T> {
    return new ResponseDto<T>({ data, message });
  }

  @Expose()
  @ApiProperty({ example: 'message 내용이 들어옵니다.' })
  get message(): string | undefined {
    return this._message;
  }

  @Expose()
  get data(): T | undefined {
    return this._data;
  }
}
