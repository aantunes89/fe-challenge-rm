import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterListState } from '@app/character-list/types';

export const selectCharacterListState = createFeatureSelector<CharacterListState>('characterList');

export const selectCharacters = createSelector(selectCharacterListState, state => state.data);

export const selectLoading = createSelector(selectCharacterListState, state => state.loading);

export const selectError = createSelector(selectCharacterListState, state => state.error);

export const selectCurrentPage = createSelector(
  selectCharacterListState,
  state => state.currentPage
);

export const selectFilters = createSelector(selectCharacterListState, state => state.filters);

export const selectTotalPages = createSelector(selectCharacterListState, state => state.totalPages);

export const selectPaginationAndFilters = createSelector(selectCharacterListState, state => ({
  currentPage: state.currentPage,
  totalPages: state.totalPages,
  filters: state.filters,
}));
