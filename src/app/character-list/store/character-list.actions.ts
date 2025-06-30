import { Character } from '@shared/models/character.interface';
import { createAction, props } from '@ngrx/store';
import { CharacterFilter } from '@app/character-list/types/character-filter.type';

export const loadCharacterList = createAction('[Character List] Load Characters');

export const loadCharacterListSuccess = createAction(
  '[Character List] Load Characters Success',
  props<{ data: Character[]; totalPages: number }>()
);

export const loadCharacterListFailure = createAction(
  '[Character List] Load Characters Failure',
  props<{ error: string; totalPages?: number | null }>()
);

export const loadNextPage = createAction('[Character List] Load Next Page');

export const loadNextPageSuccess = createAction(
  '[Character List] Load Characters Page Success',
  props<{ data: Character[]; page: number; totalPages: number }>()
);

export const loadNextPageFailure = createAction(
  '[Character List] Load Characters Page Failure',
  props<{ error: string; page: number }>()
);

export const loadNextFilteredPage = createAction('[Character List] Load Next Filtered Page');

export const setFilters = createAction(
  '[Character List] Set Filters',
  props<{ filters: Partial<CharacterFilter> }>()
);

export const applyFilters = createAction('[Character List] Apply Filters');
