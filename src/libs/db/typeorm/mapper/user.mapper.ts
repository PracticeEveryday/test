import { UserDomain } from '../../../../api/user/domain/user.domain';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMapper {
  public toOptionalDomain(userEntity: UserEntity | undefined): UserDomain | null {
    if (!userEntity) {
      return null;
    }

    return new UserDomain(userEntity.email, userEntity.name);
  }

  public toRequiredDomain(userEntity: UserEntity | undefined): UserDomain {
    if (!userEntity) {
      throw new Error('Not Found UserEntity');
    }

    return new UserDomain(userEntity.email, userEntity.name);
  }
}
