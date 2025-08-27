import { Entity, Column, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@/modules/shared/entities/base.entity';
import { Post } from '@/modules/posts/entities/post.entity';

@Entity('tags')
export class Tag extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  // Relations
  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
