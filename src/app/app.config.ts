import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';
import { loadingScreenInterceptor } from './core/interceptors/loading/loading-screen-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor, headerInterceptor, loadingScreenInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr({
      positionClass: 'toast-top-center',
      closeButton: true,
      timeOut: 10000,
      tapToDismiss: true,
      preventDuplicates: true,
    }), // Toastr providers
  ]
};
