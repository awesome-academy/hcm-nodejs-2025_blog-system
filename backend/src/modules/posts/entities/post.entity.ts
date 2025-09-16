import { AbstractEntity } from '@/modules/shared/entities/base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Author } from '@/modules/authors/entities/author.entity';
import { Category } from '@/modules/categories/entities/category.entity';
import { Comment } from '@/modules/comments/entities/comment.entity';
import { Tag } from '@/modules/tags/entities/tag.entity';
export enum PostStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PUBLISHED = 'published',
}

@Entity('posts')
export class Post extends AbstractEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.DRAFT })
  status: PostStatus;

  @Column()
  imageUrl: string;

  // Relations
  @ManyToOne(() => Author, (author) => author.posts)
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: 'post_tags',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
