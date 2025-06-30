import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterDetailState } from '@app/character-detail/types/character-detail-state.type';

export const selectCharacterDetailState =
  createFeatureSelector<CharacterDetailState>('characterDetail');

export const selectCharacter = createSelector(selectCharacterDetailState, state => state.character);

export const selectCharacterLoading = createSelector(
  selectCharacterDetailState,
  state => state.loading
);

export const selectCharacterError = createSelector(
  selectCharacterDetailState,
  state => state.error
);
