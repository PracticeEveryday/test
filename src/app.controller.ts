import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from './common/dto/response.dto';
import { TestApiDto } from './common/dto/testApi.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): ResponseDto<TestApiDto> {
    return ResponseDto.OK<TestApiDto>(this.appService.getHello());
  }
}
