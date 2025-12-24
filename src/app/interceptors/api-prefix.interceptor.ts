import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/production';
// import { environment } from '../../environments/development';
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.startsWith('http') || request.url.startsWith('assets/') || request.url.startsWith('./assets/')) {
      return next.handle(request);
    }
    const fullUrl = `${environment.apiUrl}/${request.url}`;

    const updatedRequest = request.clone({ url: fullUrl });

    return next.handle(updatedRequest);
  }
}