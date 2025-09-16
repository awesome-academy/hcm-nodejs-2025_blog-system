import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, EntityManager } from 'typeorm';
import { Tag } from '@/modules/tags/entities/tag.entity';
import { I18nService } from 'nestjs-i18n';
import { RequestI18nContextService } from '@/common/context/i18nContext.service';
import { BaseI18nService } from '../shared/baseI18n.service';
import { TagSerializer } from './serializers/tag.serializer';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TagService extends BaseI18nService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>,
    i18n: I18nService,
    Context: RequestI18nContextService,
  ) {
    super(i18n, Context);
  }
  async getAllTags(): Promise<TagSerializer[]> {
    try {
      const tags = await this.tagRepo.find({
        order: { name: 'ASC' },
      });
      return plainToInstance(TagSerializer, tags, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        await this.t('post.tag_fetch_failed'),
      );
    }
  }
  async findByIds(ids: number[], manager?: EntityManager): Promise<Tag[]> {
    const repo = manager ? manager.getRepository(Tag) : this.tagRepo;

    const tags = await repo.find({ where: { id: In(ids) } });
    if (tags.length !== ids.length) {
      throw new NotFoundException(await this.t('post.tag_not_found'));
    }
    return tags;
  }

  async findByName(name: string, manager?: EntityManager): Promise<Tag | null> {
    const repo = manager ? manager.getRepository(Tag) : this.tagRepo;
    return repo.findOne({ where: { name } });
  }
}
