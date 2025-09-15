import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Category } from '@/modules/categories/entities/category.entity';
import { I18nService } from 'nestjs-i18n';
import { RequestI18nContextService } from '@/common/context/i18nContext.service';
import { BaseI18nService } from '../shared/baseI18n.service';
import { plainToInstance } from 'class-transformer';
import { CategorySerializer } from './serializers/category.serializer';

@Injectable()
export class CategoryService extends BaseI18nService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    i18n: I18nService,
    Context: RequestI18nContextService,
  ) {
    super(i18n, Context);
  }

  async getAllCategories(): Promise<CategorySerializer[]> {
    try {
      const categories = await this.categoryRepo.find({
        order: { name: 'ASC' },
      });
      return plainToInstance(CategorySerializer, categories, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        await this.t('post.category_fetch_failed'),
      );
    }
  }

  async findById(id: number, manager?: EntityManager): Promise<Category> {
    const repo = manager ? manager.getRepository(Category) : this.categoryRepo;
    const category = await repo.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(await this.t('post.category_not_found'));
    }
    return category;
  }

  async findByName(
    name: string,
    manager?: EntityManager,
  ): Promise<Category | null> {
    const repo = manager ? manager.getRepository(Category) : this.categoryRepo;
    return repo.findOne({ where: { name } });
  }
}
