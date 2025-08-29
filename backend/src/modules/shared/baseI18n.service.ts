import { I18nService } from 'nestjs-i18n';
import { RequestI18nContextService } from '@/common/context/i18nContext.service';

export class BaseI18nService {
  constructor(
    protected readonly i18n: I18nService,
    protected readonly context: RequestI18nContextService,
  ) {}

  protected get lang(): string {
    return this.context.getLang() || 'vi';
  }

  protected async t(key: string): Promise<string> {
    return this.i18n.translate(key, { lang: this.lang }) as Promise<string>;
  }
}
