import { createReducer, on } from '@ngrx/store';
import * as CharacterDetailActions from '@app/character-detail/store/character-detail.actions';
import { CharacterDetailState } from '@app/character-detail/types/character-detail-state.type';

export const initialState: CharacterDetailState = {
  character: null,
  loading: false,
  error: null,
};

export const characterDetailReducer = createReducer(
  initialState,
  on(CharacterDetailActions.loadCharacter, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CharacterDetailActions.loadCharacterSuccess, (state, { character }) => ({
    ...state,
    character,
    loading: false,
    error: null,
  })),
  on(CharacterDetailActions.loadCharacterFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
