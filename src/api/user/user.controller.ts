import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserReqDto } from './dtos/create.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/')
  public async create(@Body() createReqDto: CreateUserReqDto) {
    return await this.userService.create(createReqDto);
  }
}
