import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class TagSerializer {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;
}
