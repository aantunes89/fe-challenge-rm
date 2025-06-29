import { createReducer, on } from '@ngrx/store';

import { CharacterListState } from '@app/character-list/types';
import * as CharacterListActions from '@app/character-list/store/character-list.actions';

export const initialState: CharacterListState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
};

export const characterListReducer = createReducer(
  initialState,

  on(CharacterListActions.loadCharacterList, state => ({
    ...state,
    loading: true,
    error: null,
    currentPage: 0,
  })),

  on(CharacterListActions.loadCharacterListSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
    currentPage: 1,
  })),

  on(CharacterListActions.loadCharacterListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CharacterListActions.loadNextPageSuccess, (state, { data, page }) => ({
    ...state,
    data: page === 1 ? data : [...state.data, ...data],
    error: null,
    currentPage: page,
  })),

  on(CharacterListActions.loadNextPageFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
