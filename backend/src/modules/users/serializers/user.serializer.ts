import { Expose, Type } from 'class-transformer';
import { AuthorSerializer } from '@/modules/authors/serializers/author.serializer';

export class UserSerializer {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  isActive: boolean;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  // Nested relation
  @Expose()
  @Type(() => AuthorSerializer)
  author?: AuthorSerializer;
}
