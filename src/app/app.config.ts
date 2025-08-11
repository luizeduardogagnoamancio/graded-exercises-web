import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ConfigService } from './services/config.service';

export function initializeApp(configService: ConfigService) {
  return (): Promise<any> => {
    return configService.loadConfig();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG(),
    provideHttpClient(withInterceptorsFromDi()),
    ConfigService,

    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    }
  ]
};
