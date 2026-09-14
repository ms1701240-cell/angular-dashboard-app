import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient,withFetch,withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/Interceptors';
import { errorInterceptor } from './core/interceptors/error-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]), withInterceptors([errorInterceptor])),
    provideRouter(routes,withComponentInputBinding())
  ]
  
};
