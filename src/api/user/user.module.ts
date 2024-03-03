import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from '../../libs/db/db.module';
import { UserProviders } from './providers/user.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../libs/db/typeorm/entities/user.entity';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, ...UserProviders],
  controllers: [UserController],
})
export class UserModule {}
