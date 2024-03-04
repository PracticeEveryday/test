import { Module } from '@nestjs/common';
import { DBConfigProvider } from './db-config.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserProviders } from './providers/user.providers';
import { UserMapper } from './mapper/user.mapper';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: DBConfigProvider })],
  exports: [TypeOrmModule],
})
export class WrapTypeormModule {}

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [...UserProviders, UserMapper],
  exports: [...UserProviders],
})
export class TypeOrmUserModule {}
