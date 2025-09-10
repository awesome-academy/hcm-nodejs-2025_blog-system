import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('password_reset_tokens')
export class PasswordResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  tokenHash: string;

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  used: boolean;

  @Column()
  createdAt: Date;
}
