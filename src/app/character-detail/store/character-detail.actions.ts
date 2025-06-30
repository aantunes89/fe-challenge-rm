import { createAction, props } from '@ngrx/store';
import { Character } from '@shared/models/character.interface';

export const loadCharacter = createAction(
  '[Character Detail] Load Character',
  props<{ id: number }>()
);

export const loadCharacterSuccess = createAction(
  '[Character Detail] Load Character Success',
  props<{ character: Character }>()
);

export const loadCharacterFailure = createAction(
  '[Character Detail] Load Character Failure',
  props<{ error: string }>()
);
