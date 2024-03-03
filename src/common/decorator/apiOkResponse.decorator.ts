import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from '../dto/response.dto';

export const CustomApiOkResponse = <DataDto extends Type<unknown>>(dataDto: DataDto, isArray: boolean = false) =>
  applyDecorators(
    ApiExtraModels(ResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: isArray
              ? {
                  data: {
                    type: 'array',
                    items: { $ref: getSchemaPath(dataDto) },
                  },
                }
              : {
                  data: { $ref: getSchemaPath(dataDto) },
                },
          },
        ],
      },
    }),
  );
