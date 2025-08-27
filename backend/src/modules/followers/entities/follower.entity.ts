import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Author } from '@/modules/authors/entities/author.entity';

@Entity('followers')
export class Follower {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Author, (author) => author.followers)
  @JoinColumn({ name: 'author_id' })
  author: Author;
}
