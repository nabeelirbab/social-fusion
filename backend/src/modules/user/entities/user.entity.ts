import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IUserParams,
  IUser,
  UserStatusEnum,
  UserRoleEnum,
  SocialProviderEnum,
} from '@lib/types';
@Entity({ name: `user` })
export class User implements IUser {
  constructor(params?: IUserParams) {
    if (params) {
      this.email = params.email;
      if (params.status) this.setStatus(params.status);
      if (params.role) this.setRole(params.role);
      if (params.disabled === false) this.disabled = params.disabled;
    }
  }

  // PrimaryGeneratedColumn decorator create error it store in uuid but return string
  // which cause in cassandra that's why we are using transformer feature
  @PrimaryGeneratedColumn(`uuid`)
  readonly id: string;

  @Index()
  @Column({
    length: 100,
    nullable: false,
  })
  readonly email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({
    type: `enum`,
    enum: UserStatusEnum,
    default: UserStatusEnum.UNVERIFIED,
  })
  status: UserStatusEnum = UserStatusEnum.UNVERIFIED;

  @Column({
    type: `enum`,
    enum: UserRoleEnum,
    default: UserRoleEnum.MEMBER,
  })
  role: UserRoleEnum = UserRoleEnum.MEMBER;

  @Column({
    nullable: true,
    type: 'enum',
    enum: SocialProviderEnum,
    default: null,
  })
  SocialProvider?: SocialProviderEnum;

  @Column({
    nullable: true,
    type: 'boolean',
    default: true,
  })
  disabled?: boolean;

  @Column()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  // Methods
  setStatus(status: UserStatusEnum) {
    this.status = status;
  }

  setRole(role: UserRoleEnum) {
    this.role = role;
  }

  async setPassword(password: string) {
    this.password = password;
  }
}
