import { Character } from '@shared/models/character.interface';
import { createAction, props } from '@ngrx/store';

export const loadCharacterList = createAction('[Character List] Load Characters');

export const loadCharacterListSuccess = createAction(
  '[Character List] Load Characters Success',
  props<{ data: Character[] }>()
);

export const loadCharacterListFailure = createAction(
  '[Character List] Load Characters Failure',
  props<{ error: string }>()
);

export const loadNextPage = createAction('[Character List] Load Next Page');

export const loadNextPageSuccess = createAction(
  '[Character List] Load Characters Page Success',
  props<{ data: Character[]; page: number }>()
);

export const loadNextPageFailure = createAction(
  '[Character List] Load Characters Page Failure',
  props<{ error: string; page: number }>()
);
