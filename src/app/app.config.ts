import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

initializeApp(environment.firebase);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
};
