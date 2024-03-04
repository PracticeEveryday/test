import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserProviders } from '../../libs/db/typeorm/providers/user.providers';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../libs/db/typeorm/entities/user.entity';
import { CreateUserReqDto } from './dtos/create.dto';
import { UserDomain } from './domain/user.domain';
import { UserMapper } from '../../libs/db/typeorm/mapper/user.mapper';

const mockUserRepository = {
  save: jest.fn(),
  create: jest.fn(),
};

const mockUserMapper = {
  toRequiredDomain: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let userMapperMock: UserMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ...UserProviders,
        { provide: UserMapper, useValue: mockUserMapper },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userMapperMock = module.get<UserMapper>(UserMapper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('성공', async () => {
      const email = 'test@test.com';
      const name = 'Kim';

      const createUserReqDto = new CreateUserReqDto(email, name);
      const savedUser = new UserDomain(email, name);
      jest.spyOn(mockUserRepository, 'create').mockResolvedValue(savedUser);

      jest.spyOn(userMapperMock, 'toRequiredDomain').mockReturnValue(new UserDomain(createUserReqDto.email, createUserReqDto.name));

      const result = await service.create(createUserReqDto);

      expect(result.email).toBe(email);
      expect(result.name).toBe(name);
    });
  });
});
