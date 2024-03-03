import { Injectable } from '@nestjs/common';
import { TestApiDto } from './common/dto/testApi.dto';

@Injectable()
export class AppService {
  getHello() {
    return new TestApiDto('Hello World!');
  }
}
