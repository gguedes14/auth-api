import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  user_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
