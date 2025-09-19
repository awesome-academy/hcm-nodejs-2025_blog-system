import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class AuthorSerializer {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  penName: string;

  @ApiProperty()
  @Expose()
  bio: string;

  @ApiProperty()
  @Expose()
  @Transform(({ obj }) => obj.user?.avatarUrl)
  avatarUrl: string;
}
