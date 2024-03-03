import { Provider } from '@nestjs/common';
import { DbInjectionToken } from '../../../libs/db/db.injection.token';
import { UserRepository } from '../../../libs/db/typeorm/repositories/user.repository';

export const UserProviders: Provider[] = [{ provide: DbInjectionToken.USER_REPOSITORY, useClass: UserRepository }];
