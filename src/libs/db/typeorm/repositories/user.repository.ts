import { IUserRepository } from '../../../../api/user/interfaces/user.repository.interface';
import { CreateUserReqDto } from '../../../../api/user/dtos/create.dto';
import { UserDomain } from '../../../../api/user/domain/user.domain';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMapper } from '../mapper/user.mapper';
import { Inject } from '@nestjs/common';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @Inject(UserMapper) private userMapper: UserMapper,
  ) {}

  public async create(createUserReqDto: CreateUserReqDto): Promise<UserDomain> {
    const newUser = new UserEntity(createUserReqDto.email, createUserReqDto.name);
    const userEntity = await this.userRepository.save(newUser);

    return this.userMapper.toRequiredDomain(userEntity);
  }
}
