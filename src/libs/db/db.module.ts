import { Module } from '@nestjs/common';

import { WrapTypeormModule } from './typeorm/wrap.typeorm.module';

@Module({
  imports: [WrapTypeormModule],
  exports: [WrapTypeormModule],
})
export class DbModule {}
