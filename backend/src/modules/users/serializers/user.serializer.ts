import { Expose, Type } from 'class-transformer';
import { AuthorSerializer } from '@/modules/authors/serializers/author.serializer';
import { ApiProperty } from '@nestjs/swagger';
export class UserSerializer {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  fullName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  avatarUrl: string;

  @ApiProperty()
  @Expose()
  role: string;

  // Nested relation
  @ApiProperty()
  @Expose()
  @Type(() => AuthorSerializer)
  author?: AuthorSerializer;
}
