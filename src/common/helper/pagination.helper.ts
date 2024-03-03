import { PaginationResDto } from '../dto/pagination.res.dto';
import { PaginationQueryDto } from '../dto/pagination.req.dto';

export function toPagination<T>(params: { queryDto: PaginationQueryDto; data: T; totalCount: number }): PaginationResDto<T> {
  const { pageSize: size, pageNo: page } = params.queryDto;
  const { totalCount, data } = params;

  return new PaginationResDto({ totalCount, totalPage: Math.ceil(totalCount / size), pageNo: page, pageSize: size, data });
}
