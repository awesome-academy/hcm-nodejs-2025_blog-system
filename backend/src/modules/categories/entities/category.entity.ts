import { Entity, Column, OneToMany } from 'typeorm';
import { AbstractEntity } from '@/modules/shared/entities/base.entity';
import { Post } from '@/modules/posts/entities/post.entity';

@Entity('categories')
export class Category extends AbstractEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // Relations
  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
