import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { EnvService } from '../../env/env.service';
import { EnvEnum } from '../../env/env.enum';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class DBConfigProvider implements TypeOrmOptionsFactory {
  private readonly host: string;
  private readonly port: number;
  private readonly username: string;
  private readonly password: string;
  private readonly database: string;

  constructor(private readonly envService: EnvService) {
    this.host = envService.getOrThrow<string>(EnvEnum.DB_HOST);
    this.port = +envService.getOrThrow<string>(EnvEnum.DB_PORT);
    this.username = envService.getOrThrow<string>(EnvEnum.DB_USERNAME);
    this.password = envService.getOrThrow<string>(EnvEnum.DB_PASSWORD);
    this.database = envService.getOrThrow<string>(EnvEnum.DB_DATABASE);
  }

  // local
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.host,
      port: this.port,
      database: this.database,
      password: this.password,
      username: this.username,
      synchronize: true,
      logging: false,
      entities: [UserEntity],
      namingStrategy: new SnakeNamingStrategy(),
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
    };
  }
}
