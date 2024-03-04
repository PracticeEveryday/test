import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../libs/db/typeorm/entities/user.entity';
import { UserProviders } from '../../libs/db/typeorm/providers/user.providers';
import { CreateUserReqDto, CreateUserResDto } from './dtos/create.dto';
import { UserDomain } from './domain/user.domain';
import { UserMapper } from '../../libs/db/typeorm/mapper/user.mapper';

const mockUserRepository = {
  save: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        ...UserProviders,
        UserMapper,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Create 생성 성공 시 요청과 동일한 값을 반환한다.', async () => {
    // Arrange
    const createUserReqDto = new CreateUserReqDto('test@example.com', 'kim');
    const userDomain = new UserDomain('test@example.com', 'kim');
    const createUserResDto = new CreateUserResDto(userDomain);

    jest.spyOn(userService, 'create').mockResolvedValueOnce(createUserResDto);
    const result = await controller.create(createUserReqDto);

    expect(result).toEqual(createUserResDto);
    expect(userService.create).toHaveBeenCalledWith(createUserReqDto);
  });

  // 목데이터이기 떄문에 생성된 UserEntity가 없어 Error가 반환된다.
  it('email이 없으면 Not Found Error를 반환한다.', async () => {
    await expect(async () => {
      await controller.create({ name: 'kim', email: 'hello' });
    }).rejects.toThrowError(new Error('Not Found UserEntity'));
  });
});
