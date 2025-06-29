import { inject, Injectable } from '@angular/core';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { CharacterApiService } from '@shared/data-access/character-api.service';
import * as CharacterListActions from '@app/character-list/store/character-list.actions';
import * as CharacterListSelectors from '@app/character-list/store/character-list.selectors';

@Injectable()
export class CharacterListEffects {
  private actions$ = inject(Actions);
  private characterApiService = inject(CharacterApiService);
  private store = inject(Store);

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

  loadNextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterListActions.loadNextPage),
      withLatestFrom(this.store.select(CharacterListSelectors.selectCurrentPage)),
      switchMap(([, currentPage]) => {
        const nextPage = currentPage + 1;
        return this.characterApiService.getCharacters(nextPage).pipe(
          map(response =>
            CharacterListActions.loadNextPageSuccess({
              data: response.results,
              page: nextPage,
            })
          ),
          catchError(error =>
            of(
              CharacterListActions.loadNextPageFailure({
                error: error.message || 'Failed to load next page',
                page: nextPage,
              })
            )
          )
        );
      })
    )
  );
}
