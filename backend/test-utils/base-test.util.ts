import { I18nService } from 'nestjs-i18n';
import { RequestI18nContextService } from '@/common/context/i18nContext.service';
import { ObjectLiteral, Repository } from 'typeorm';

// --- I18n & Request Context ---
export function createMockI18nService(): jest.Mocked<I18nService> {
  return {
    translate: jest.fn((key: string) => key), 
    t: jest.fn((key: string) => key),
  } as any;
}

export function createMockRequestI18nContextService(): Partial<RequestI18nContextService> {
  return {
    getLang: jest.fn(() => 'vi'),
  };
}

// --- TypeORM Repository ---
export function createMockRepository<T extends ObjectLiteral = any>(): Partial<Repository<T>> {
  return {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    findOneBy: jest.fn(),
    merge: jest.fn(),
    count: jest.fn(),
    delete: jest.fn(),
  };
}
