import { Entity, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { AbstractEntity } from '@/modules/shared/entities/base.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Post } from '@/modules/posts/entities/post.entity';
import { Follower } from '@/modules/followers/entities/follower.entity';

export enum AuthorStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('authors')
export class Author extends AbstractEntity {
  @Column({ unique: true })
  penName: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({
    type: 'enum',
    enum: AuthorStatus,
    default: AuthorStatus.PENDING,
  })
  isApproved: AuthorStatus;

  //Relations
  @OneToOne(() => User, (user) => user.author)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Follower, (follower) => follower.author)
  followers: Follower[];
}
