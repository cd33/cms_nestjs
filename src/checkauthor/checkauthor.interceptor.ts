import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CheckauthorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (!request.body.author) {
      request.body.author = 'Carlito';
    }
    if (!request.body.creationDate) {
      request.body.creationDate = new Date().toISOString();
    }
    return next.handle();
  }
}
