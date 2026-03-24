import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class IdempotencyInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (req.method === 'POST' && req.url.includes('/orders')) {

      const key = crypto.randomUUID();

      const cloned = req.clone({
        setHeaders: {
          'Idempotency-Key': key
        }
      });

      return next.handle(cloned);
    }

    return next.handle(req);
  }
}