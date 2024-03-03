import { Module } from '@nestjs/common';

import { WrapTypeormModule } from './typeorm/wrap.typeorm.module';

@Module({
  imports: [WrapTypeormModule],
})
export class DbModule {}
