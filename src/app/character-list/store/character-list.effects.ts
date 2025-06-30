import { inject, Injectable } from '@angular/core';
import { catchError, map, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { CharacterApiService } from '@shared/data-access/character-api.service';
import * as CharacterListActions from '@app/character-list/store/character-list.actions';
import * as CharacterListSelectors from '@app/character-list/store/character-list.selectors';
import { extractApiError } from '@app/character-list/utils/extract-api-error';
import { hasActiveFilters } from '@app/character-list/utils/has-active-filters';

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
          map(({ results: data, info }) =>
            CharacterListActions.loadCharacterListSuccess({
              data,
              totalPages: info?.pages ?? null,
            })
          ),
          catchError(error => {
            return of(
              CharacterListActions.loadCharacterListFailure({
                error: extractApiError(error, 'Failed to load characters'),
              })
            );
          })
        )
      )
    )
  );

  loadNextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterListActions.loadNextPage),
      withLatestFrom(this.store.select(CharacterListSelectors.selectPaginationAndFilters)),
      map(([, { currentPage, totalPages }]) => {
        const nextPage = currentPage + 1;
        return { currentPage, nextPage, totalPages };
      }),
      filter(({ currentPage, totalPages }) => totalPages == null || currentPage < totalPages),
      switchMap(({ nextPage }) =>
        this.characterApiService.getCharacters(nextPage).pipe(
          map(({ results: data, info }) =>
            CharacterListActions.loadNextPageSuccess({
              data,
              page: nextPage,
              totalPages: info?.pages ?? null,
            })
          ),
          catchError(error => {
            return of(
              CharacterListActions.loadNextPageFailure({
                error: extractApiError(error, 'Failed to load next page'),
                page: nextPage,
              })
            );
          })
        )
      )
    )
  );

  loadNextFilteredPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterListActions.loadNextFilteredPage),
      withLatestFrom(this.store.select(CharacterListSelectors.selectPaginationAndFilters)),
      map(([, { currentPage, totalPages, filters }]) => {
        const nextPage = currentPage + 1;
        return { currentPage, nextPage, totalPages, filters };
      }),
      filter(({ currentPage, totalPages }) => totalPages == null || currentPage < totalPages),
      switchMap(({ nextPage, filters }) =>
        this.characterApiService.getCharactersByFilters(filters, nextPage).pipe(
          map(({ results: data, info }) =>
            CharacterListActions.loadNextPageSuccess({
              data,
              page: nextPage,
              totalPages: info?.pages ?? null,
            })
          ),
          catchError(error => {
            return of(
              CharacterListActions.loadNextPageFailure({
                error: extractApiError(error, 'Failed to load next page'),
                page: nextPage,
              })
            );
          })
        )
      )
    )
  );

  applyFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterListActions.applyFilters),
      withLatestFrom(this.store.select(CharacterListSelectors.selectFilters)),
      switchMap(([, filters]) => {
        if (!hasActiveFilters(filters)) {
          return of(CharacterListActions.loadCharacterList());
        }

        return this.characterApiService.getCharactersByFilters(filters, 1).pipe(
          map(({ results: data, info }) =>
            CharacterListActions.loadCharacterListSuccess({
              data,
              totalPages: info?.pages ?? null,
            })
          ),
          catchError(error => {
            return of(
              CharacterListActions.loadCharacterListFailure({
                error: extractApiError(error, 'Failed to load characters'),
              })
            );
          })
        );
      })
    )
  );
}
