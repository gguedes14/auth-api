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

@Entity('tokens')
class UsersTokens {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.token, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  user: User;
}

export default UsersTokens;
