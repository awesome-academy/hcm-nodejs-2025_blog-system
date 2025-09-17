import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Author } from '@/modules/authors/entities/author.entity';
import { BaseI18nService } from '../shared/baseI18n.service';
import { I18nService } from 'nestjs-i18n';
import { RequestI18nContextService } from '@/common/context/i18nContext.service';

@Injectable()
export class AuthorService extends BaseI18nService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    i18n: I18nService,
    context: RequestI18nContextService,
  ) {
    super(i18n, context);
  }

  async getAuthorByUserId(
    userId: number,
    manager?: EntityManager,
  ): Promise<Author> {
    const repo = manager
      ? manager.getRepository(Author)
      : this.authorRepository;

    const author = await repo.findOne({
      where: { user: { id: userId } },
    });

    if (!author) {
      throw new NotFoundException(await this.t('author.author_not_found'));
    }
    return author;
  }
}
