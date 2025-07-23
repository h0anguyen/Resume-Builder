import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../../sakai-ng/src/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from '../../sakai-ng/src/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './app/interceptors/api-prefix.interceptor';
import { appConfig } from './app.config';
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
    }
  ]
});
