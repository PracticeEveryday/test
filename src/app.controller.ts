import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseException } from './common/filter/exception/base.exception';
import { NotFoundException } from './common/filter/exception/notFound.exception';
import { ResponseDto } from './common/dto/response.dto';
import { TestApiDto } from './common/dto/testApi.dto';
import { CustomApiOkResponse } from './common/decorator/apiOkResponse.decorator';
import { ApiOkResponsePaginated } from './common/decorator/apiOkResponsePaginated.decorator';
import { TestListQueryDto } from './common/dto/testListApi.dto';
import { toPagination } from './common/helper/pagination.helper';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @CustomApiOkResponse(TestApiDto)
  getHello(): ResponseDto<TestApiDto> {
    return ResponseDto.OK<TestApiDto>(this.appService.getHello());
  }

  @Get('/list')
  @ApiOkResponsePaginated(TestApiDto)
  getHelloList(@Query() queryDto: TestListQueryDto) {
    const data = this.appService.getHello();
    return toPagination<TestApiDto>({ queryDto, data, totalCount: 1 });
  }

  @Get('/error')
  getError() {
    throw new BaseException({
      message: '에러 메시지입니다.',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  @Get('/warn')
  getWarn() {
    throw new NotFoundException({
      message: '못 찾았어요!',
    });
  }
}
