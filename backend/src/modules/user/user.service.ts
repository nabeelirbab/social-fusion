import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConfigEnum,
  IServerConfig,
  IUserParams,
  ServerConfigEnum,
  UserRoleEnum,
  UserStatusEnum,
} from '@lib/types';
import { ConfigService } from '@nestjs/config';
import { AuthHelper } from '../auth/auth.helper';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(ConfigService)
    private readonly config: ConfigService,
    @Inject(AuthHelper)
    private readonly helper: AuthHelper
  ) {}
  async createAdmin() {
    const isAdminExit = await this.userRepository.findOneBy({
      role: UserRoleEnum.ADMIN,
    });
    if (isAdminExit != null) return;
    const adminDetail: IServerConfig[ServerConfigEnum.ADMIN] =
      this.config.get<IServerConfig>(ConfigEnum.SERVER).admin;
    const adminUser: IUserParams = {
      ...adminDetail,
      role: UserRoleEnum.ADMIN,
      status: UserStatusEnum.ACTIVE,
      disabled: false,
    };
    const admin = new User(adminUser);
    const hashedPassword = await this.helper.encodePassword(
      adminDetail.password
    );
    admin.setPassword(hashedPassword);
    this.userRepository.save(admin);
  }
}
