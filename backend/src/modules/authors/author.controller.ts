import { Controller, Param, Get } from '@nestjs/common';
import { ApiResponseData } from '@/common/interceptors/responseSwagger.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { AuthorSerializer } from './serializers/author.serializer';
import { AuthorService } from './author.service';

@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get('info/:id')
  @ApiResponseData(AuthorSerializer)
  async getAuthorInfo(@Param('id') id: number): Promise<AuthorSerializer> {
    return this.authorService.getAuthorById(id);
  }
}
