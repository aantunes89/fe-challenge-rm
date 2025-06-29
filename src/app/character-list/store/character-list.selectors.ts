import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterListState } from '../types';

export const selectCharacterListState = createFeatureSelector<CharacterListState>('characterList');

export const selectCharacters = createSelector(selectCharacterListState, state => state.data);

export const selectLoading = createSelector(selectCharacterListState, state => state.loading);

export const selectError = createSelector(selectCharacterListState, state => state.error);
