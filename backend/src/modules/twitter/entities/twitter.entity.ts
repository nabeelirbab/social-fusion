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
@Entity({ name: 'twitter_profile' })
export class Twitter {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  userName: string;

  @OneToOne(() => User, (user) => user.twitter, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  twitterId: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  accessTokenSecret: string;

  @Column()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  // Methods
}
