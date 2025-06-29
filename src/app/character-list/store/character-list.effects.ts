import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CharacterApiService } from '../../shared/data-access/character-api.service';
import * as CharacterListActions from './character-list.actions';

@Injectable()
export class CharacterListEffects {
  private actions$ = inject(Actions);
  private characterApiService = inject(CharacterApiService);

  loadCharacterList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterListActions.loadCharacterList),
      switchMap(() =>
        this.characterApiService.getCharacters().pipe(
          map(response =>
            CharacterListActions.loadCharacterListSuccess({
              data: response.results,
            })
          ),
          catchError(error =>
            of(
              CharacterListActions.loadCharacterListFailure({
                error: error.message || 'Failed to load characters',
              })
            )
          )
        )
      )
    )
  );
}
