import { Request, Response, NextFunction } from 'express';
import { RequestI18nContextService} from '../context/i18nContext.service';

export function createI18nContextMiddleware(contextService: RequestI18nContextService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const rawLang = req.headers['accept-language']?.split(',')[0] || 'vi';
    const lang = rawLang.split('-')[0].toLowerCase();
    contextService.run(
      () => {
        contextService.set('lang', lang);
        next();
      },
      { lang },
    );
  };
}
