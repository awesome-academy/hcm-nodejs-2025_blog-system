import { Expose, Type } from 'class-transformer';
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
}
