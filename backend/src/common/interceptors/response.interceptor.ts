import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseData } from '../response/response_data';
import { ResponseMessage } from '../constants/response_message.constant';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseData<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseData<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        // wrap dữ liệu controller thành ResponseData chuẩn
        return new ResponseData<T>(
          data,
          response.statusCode,
          ResponseMessage[response.statusCode] || 'Unknown',
        );
      }),
    );
  }
}
