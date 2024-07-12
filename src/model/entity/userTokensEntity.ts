import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

import User from './userEntity';

@Entity('tokens')
class UsersTokens {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  @PrimaryColumn()
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
