import { createReducer, on } from '@ngrx/store';

import { CharacterListState } from '@app/character-list/types';
import { CharacterFilter } from '@app/character-list/types';
import * as CharacterListActions from '@app/character-list/store/character-list.actions';

export const initialState: CharacterListState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  filters: {} as Partial<CharacterFilter>,
  totalPages: null,
};

export const characterListReducer = createReducer(
  initialState,

  on(CharacterListActions.loadCharacterList, state => ({
    ...state,
    loading: true,
    error: null,
    currentPage: 1,
  })),

  on(CharacterListActions.loadCharacterListSuccess, (state, { data, totalPages }) => ({
    ...state,
    data,
    loading: false,
    error: null,
    totalPages,
  })),

  on(CharacterListActions.loadCharacterListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CharacterListActions.loadNextPageSuccess, (state, { data, page, totalPages }) => ({
    ...state,
    data: page === 1 ? data : [...state.data, ...data],
    error: null,
    currentPage: page,
    totalPages,
  })),

  on(CharacterListActions.loadNextPage, state => ({
    ...state,
    currentPage: state.currentPage + 1,
  })),

  on(CharacterListActions.loadNextPageFailure, (state, { error }) => ({
    ...state,
    currentPage: state.currentPage - 1,
    error,
  })),

  on(CharacterListActions.loadNextFilteredPage, state => ({
    ...state,
    currentPage: state.currentPage + 1,
  })),

  on(CharacterListActions.setFilters, (state, { filters }) => ({
    ...state,
    filters,
    currentPage: 1,
  })),

  on(CharacterListActions.applyFilters, state => ({
    ...state,
    loading: true,
    error: null,
    currentPage: 1,
  }))
);
