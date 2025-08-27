import { AbstractEntity } from '@/modules/shared/entities/base.entity';
import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { Author } from '@/modules/authors/entities/author.entity';
import { Follower } from '@/modules/followers/entities/follower.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';
import { Notification } from '@/modules/notifications/entities/notify.entity';

export enum UserRole {
  ADMIN = 'admin',
  AUTHOR = 'author',
  USER = 'user',
}

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  //Relations
  @OneToOne(() => Author, (author) => author.user)
  author: Author;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Follower, (follower) => follower.user)
  followers: Follower[];
}
