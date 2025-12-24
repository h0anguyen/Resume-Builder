import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CACHEABLE_APIS } from '../config/cache.config';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, { data: HttpResponse<any>; expiry: number }>();
  private ttl = 5 * 60 * 1000; // 5 phút

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Chỉ cache GET và chỉ cache nếu URL nằm trong danh sách cấu hình
    if (req.method !== 'GET' || !this.shouldCache(req.url)) {
      return next.handle(req);
    }

    const cached = this.cache.get(req.url);
    const now = Date.now();

    if (cached && cached.expiry > now) {
      console.log('🟢 Cache hit:', req.url);
      return of(cached.data.clone());
    }

    console.log('🔵 Cache miss:', req.url);
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, {
            data: event.clone(), // clone response để tránh bị mutate
            expiry: now + this.ttl
          });
        }
      })
    );
  }

  private shouldCache(url: string): boolean {
    return CACHEABLE_APIS.some(api => url.includes(api));
  }
}
