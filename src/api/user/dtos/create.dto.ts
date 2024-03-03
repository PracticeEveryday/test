import { Exclude, Expose } from 'class-transformer';
import { UserDomain } from '../domain/user.domain';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserReqDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  public name: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }
}

export class CreateUserResDto {
  @Exclude() private readonly _email: string;
  @Exclude() private readonly _name: string;

  constructor(userDomain: UserDomain) {
    this._email = userDomain.email;
    this._name = userDomain.name;
  }

  @Expose()
  get email(): string {
    return this._email;
  }

  @Expose()
  get name(): string {
    return this._name;
  }
}
