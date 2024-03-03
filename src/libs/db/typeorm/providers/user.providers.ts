import { Provider } from '@nestjs/common';
import { DbInjectionToken } from '../../db.injection.token';
import { UserRepository } from '../repositories/user.repository';

export const UserProviders: Provider[] = [{ provide: DbInjectionToken.USER_REPOSITORY, useClass: UserRepository }];
