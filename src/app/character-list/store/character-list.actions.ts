import { createAction, props } from '@ngrx/store';
import { Character } from '../../shared/models/character.interface';

export const loadCharacterList = createAction('[Character List] Load Characters');

export const loadCharacterListSuccess = createAction(
  '[Character List] Load Characters Success',
  props<{ data: Character[] }>()
);

export const loadCharacterListFailure = createAction(
  '[Character List] Load Characters Failure',
  props<{ error: string }>()
);
