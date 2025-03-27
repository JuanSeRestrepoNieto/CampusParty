import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password_hash: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  last_login: Date;

  @Column({ nullable: true })
  id_token: number;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  expires_at_token: Date;

  @Column({ nullable: true })
  created_at_token: Date;
}
