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
@Entity({ name: 'linkedin_profile' })
export class Linkedin {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ nullable: true, type: 'text' })
  accessToken: string;

  @Column({ nullable: true })
  URN: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  profilePic: string;

  @OneToOne(() => User, (user) => user.linkedin, { onDelete: 'CASCADE' })
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
