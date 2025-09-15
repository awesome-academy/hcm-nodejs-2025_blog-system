import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '@/modules/authors/entities/author.entity';
import { ApprovalAuthorDto } from './dto/approval-author.dto';
import { BaseI18nService } from '../shared/baseI18n.service';
import { I18nService } from 'nestjs-i18n';
import { RequestI18nContextService } from '@/common/context/i18nContext.service';
import { AuthorSerializer } from './serializers/author.serializer';
import { AuthorStatus } from '@/modules/authors/entities/author.entity';

@Injectable()
export class AdminAuthorService extends BaseI18nService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    i18n: I18nService,
    context: RequestI18nContextService,
  ) {
    super(i18n, context);
  }

  // Lấy danh sách Author chưa được duyệt
  async getPendingAuthors(): Promise<AuthorSerializer[]> {
    try {
      return await this.authorRepository.find({
        where: { isApproved: AuthorStatus.PENDING },
        relations: ['user'],
      });
    } catch (error) {
      throw new BadRequestException(await this.t('author.get_pending_failed'));
    }
  }

  // Duyệt hoặc từ chối Author
  async updateApproval(
    authorId: number,
    dto: ApprovalAuthorDto,
  ): Promise<{ message: string }> {
    try {
      const author = await this.authorRepository.findOne({
        where: { id: authorId, isApproved: AuthorStatus.PENDING },
        relations: ['user'],
      });

      if (!author) {
        throw new NotFoundException(await this.t('author.author_not_found'));
      }

      author.isApproved = dto.isApproved;
      await this.authorRepository.save(author);

      return {
        message:
          dto.isApproved === AuthorStatus.APPROVED
            ? await this.t('author.approval_success')
            : await this.t('author.update_success'),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        await this.t('author.update_approval_failed'),
      );
    }
  }
}
