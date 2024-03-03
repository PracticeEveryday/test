import { Injectable } from '@nestjs/common';
import { EnvEnum } from './env.enum';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '../../common/filter/exception/badRequest.exception';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  get<T>(key: EnvEnum, defaultValue?: T): T {
    const value = this.configService.get(EnvEnum[key]) || defaultValue;
    if (!value) throw new BadRequestException({ message: `${key} 환경 변수를 추가해주세요.` });
    return value;
  }
}
