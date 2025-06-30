import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from '@app/app.routes';
import { characterListReducer } from '@app/character-list/store';
import { CharacterListEffects } from '@app/character-list/store';
import { CharacterDetailsEffects } from '@app/character-detail/store';
import { characterDetailReducer } from '@app/character-detail/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      characterList: characterListReducer,
      characterDetail: characterDetailReducer,
    }),
    provideEffects([CharacterListEffects, CharacterDetailsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideAnimations(),
  ],
};
