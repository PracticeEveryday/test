import { UserDomain } from '../../../../api/user/domain/user.domain';
import { UserEntity } from '../entities/user.entity';

export default class UserMapper {
  public static toOptionalDomain(userEntity: UserEntity | undefined): UserDomain | null {
    if (!userEntity) {
      return null;
    }

    return new UserDomain(userEntity.email, userEntity.name);
  }

  public static toRequiredDomain(userEntity: UserEntity | undefined): UserDomain {
    if (!userEntity) {
      throw new Error('Not Found UserEntity');
    }

    return new UserDomain(userEntity.email, userEntity.name);
  }
}
