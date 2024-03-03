import { Module } from '@nestjs/common';
import { DBConfigProvider } from './db-config.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserProviders } from './providers/user.providers';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: DBConfigProvider })],
  exports: [TypeOrmModule],
})
export class WrapTypeormModule {}

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [...UserProviders],
  exports: [...UserProviders],
})
export class TypeOrmUserModule {}
