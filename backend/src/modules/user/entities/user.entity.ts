import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import {
  IUserParams,
  IUser,
  UserStatusEnum,
  UserRoleEnum,
  SocialProviderEnum,
} from '@lib/types';
import { Facebook } from 'src/modules/facebook/entities/facebook.entity';
import { Linkedin } from 'src/modules/linkedin/entities/linkedin.entity';
import { LinkedinChat } from 'src/modules/linkedin/entities/linkedinchat.entity';
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
  @PrimaryGeneratedColumn()
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

  @OneToOne(() => Facebook, (fb) => fb.user, {
    cascade: true,
    eager: true,
  })
  facebook: Facebook;

  @OneToOne(() => Linkedin, (linkedin) => linkedin.user, {
    cascade: true,
    eager: true,
  })
  linkedin: Linkedin;

  @OneToMany(() => LinkedinChat, (chat) => chat.sender)
  sentChats: LinkedinChat[];

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
