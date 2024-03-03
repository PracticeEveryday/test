import { DynamicModule, Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { ConfigModule } from '@nestjs/config';
import { NodeEnvEnum } from '../../common/enum/nodeEnv.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: (() => {
        switch (process.env.NODE_ENV) {
          case NodeEnvEnum.PROD:
            return `.env.${NodeEnvEnum.PROD}`;
          case NodeEnvEnum.QA:
            return `.env.${NodeEnvEnum.QA}`;
          case NodeEnvEnum.DEV:
            return `.env.${NodeEnvEnum.DEV}`;
          case NodeEnvEnum.LOCAL:
            return `.env.${NodeEnvEnum.LOCAL}`;
          default:
            return `.env`;
        }
      })(),
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: EnvModule,
    };
  }
}
