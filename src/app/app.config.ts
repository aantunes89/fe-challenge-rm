import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from '@app/app.routes';
import { characterListReducer } from '@app/character-list/store/character-list.reducer';
import { CharacterListEffects } from '@app/character-list/store/character-list.effects';
import { CharacterDetailsEffects } from '@app/character-detail/store/character-detail.effects';
import { characterDetailReducer } from '@app/character-detail/store/character-detail.reducer';
import { themeReducer } from '@app/shared/store/theme.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      characterList: characterListReducer,
      characterDetail: characterDetailReducer,
      theme: themeReducer,
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
