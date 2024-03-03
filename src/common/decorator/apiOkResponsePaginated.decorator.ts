import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { PaginationResDto } from '../dto/pagination.res.dto';

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) => {
  return applyDecorators(
    ApiExtraModels(PaginationResDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationResDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
};
