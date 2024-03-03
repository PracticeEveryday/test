import { Module } from '@nestjs/common';
import { DBConfigProvider } from './db-config.provider';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: DBConfigProvider })],
  exports: [TypeOrmModule],
})
export class WrapTypeormModule {}
