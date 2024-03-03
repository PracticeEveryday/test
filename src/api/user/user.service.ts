import { Inject, Injectable } from '@nestjs/common';
import { CreateUserReqDto, CreateUserResDto } from './dtos/create.dto';
import { IUserRepository } from './interfaces/user.repository.interface';
import { DbInjectionToken } from '../../libs/db/db.injection.token';

@Injectable()
export class UserService {
  constructor(@Inject(DbInjectionToken.USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  public async create(createReqDto: CreateUserReqDto): Promise<CreateUserResDto> {
    return new CreateUserResDto(await this.userRepository.create(createReqDto));
  }
}
