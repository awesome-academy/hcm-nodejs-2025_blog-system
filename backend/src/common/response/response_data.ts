import { ApiProperty } from '@nestjs/swagger';

export class ResponseData<D> {
  @ApiProperty()
  data: D | D[];
  
  @ApiProperty()
  statusCode: number;
  
  @ApiProperty()
  message: string;
  
  @ApiProperty()
  error?: any;

  constructor(
    data: D | D[],
    statusCode: number,
    message: string,
    error: any = null,
  ) {
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    return this;
  }
}
