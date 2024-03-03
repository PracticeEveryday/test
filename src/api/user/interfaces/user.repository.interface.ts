import { UserDomain } from '../domain/user.domain';
import { CreateUserReqDto } from '../dtos/create.dto';

export interface IUserRepository {
  create(userDomain: CreateUserReqDto): Promise<UserDomain>;
}
