import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptionalNumber } from '../decorator/isOptionalNumber.decorator';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: '조회하고자 하는 페이지 (기본값: 1)',
    example: 1,
  })
  @IsOptionalNumber('pageNo', 0)
  public pageNo: number;

  @ApiPropertyOptional({
    description: '불러올 아이템 갯수 (기본값: 10)',
    example: 10,
  })
  @IsOptionalNumber('pageSize', 0)
  public pageSize: number;

  constructor(pageNo: number, pageSize: number) {
    this.pageNo = pageNo;
    this.pageSize = pageSize;
  }
}
