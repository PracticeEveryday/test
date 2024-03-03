import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

class PaginationMetaData {
  @Exclude() private readonly _pageNo: number;
  @Exclude() private readonly _pageSize: number;
  @Exclude() private readonly _totalCount: number;
  @Exclude() private readonly _totalPage: number;

  constructor(params: { pageNo: number; pageSize: number; totalCount: number; totalPage: number }) {
    this._pageNo = params.pageNo;
    this._pageSize = params.pageSize;
    this._totalCount = params.totalCount;
    this._totalPage = params.totalPage;
  }

  @Expose()
  @ApiProperty({ description: '조회하고자 하는 페이지', example: 1 })
  get pageNo() {
    return this._pageNo;
  }

  @Expose()
  @ApiProperty({ description: '불러올 아이템 갯수', example: 10 })
  get pageSize() {
    return this._pageSize;
  }

  @Expose()
  @ApiProperty({ description: '총 아이템 갯수', example: 1 })
  get totalCount() {
    return this._totalCount;
  }

  @Expose()
  @ApiProperty({ description: '총 페이지 수', example: 1 })
  get totalPage() {
    return this._totalPage;
  }
}

export class PaginationResDto<T> {
  @Exclude() private readonly _metaData: PaginationMetaData;
  @Exclude() private readonly _data: T;

  constructor(info: { pageNo: number; pageSize: number; totalCount: number; totalPage: number; data: T }) {
    const { pageNo, pageSize, totalPage, totalCount, data } = info;

    this._metaData = new PaginationMetaData({ pageNo, pageSize, totalPage, totalCount });
    this._data = data;
  }

  @ApiProperty()
  @Expose()
  get metaData(): PaginationMetaData {
    return this._metaData;
  }

  @Expose()
  get data() {
    return this._data;
  }
}
