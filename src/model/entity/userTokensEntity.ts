import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import User from './userEntity';

@Entity({ name: 'users_tokens' })
class UsersTokens {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  email: string;

  @Column()
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.token, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'email', referencedColumnName: 'id' })
  user: User;
}

export default UsersTokens;
