import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CategorySerializer {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description?: string;
}
