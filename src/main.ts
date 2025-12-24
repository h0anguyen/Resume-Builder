import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from '../src/app.routes';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './app/interceptors/api-prefix.interceptor';
import { appConfig } from './app.config';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
import { CacheInterceptor } from './app/interceptors/cache.interceptor';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  ...appConfig, // ✅ Trích các trường từ appConfig (ví dụ: providers, animations, ...)
  providers: [
    ...(appConfig.providers || []), // ✅ Thêm các providers từ appConfig nếu có
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,   // ✅ thêm interceptor cache
      multi: true
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'vi',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }),
    ),
    MessageService
  ]
});
