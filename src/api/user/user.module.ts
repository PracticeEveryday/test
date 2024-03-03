import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmUserModule } from '../../libs/db/typeorm/wrap.typeorm.module';

const UserDBModule = TypeOrmUserModule;

@Module({
  imports: [UserDBModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
