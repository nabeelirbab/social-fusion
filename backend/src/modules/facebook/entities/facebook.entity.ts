import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
@Entity({ name: 'facebook_profile' })
export class Facebook {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ nullable: true })
  facebookAccessToken: string;

  @Column({ nullable: true })
  facebookId: string;

  @Column({ nullable: true })
  email: string;

  @OneToOne(() => User, (user) => user.facebook, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  accessTokenExpiresAt: Date;

  @Column()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  // Methods
}
