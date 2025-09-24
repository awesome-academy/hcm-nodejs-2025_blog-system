import { Expose, Type } from 'class-transformer';
import { AuthorSerializer } from '@/modules/authors/serializers/author.serializer';
import { ApiProperty } from '@nestjs/swagger';
export class FollowerSerializer {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Type(() => AuthorSerializer)
  @Expose()
  author: AuthorSerializer;
}
