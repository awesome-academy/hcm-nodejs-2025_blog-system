import { Expose, Type } from 'class-transformer';
import { AuthorSerializer } from '@/modules/authors/serializers/author.serializer';
import { ApiProperty } from '@nestjs/swagger';

export class UserSerializer {
  @Expose()
  id: number;

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
