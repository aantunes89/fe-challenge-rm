import { createReducer, on } from '@ngrx/store';

import { CharacterListState } from '../types';
import * as CharacterListActions from './character-list.actions';

export const initialState: CharacterListState = {
  data: [],
  loading: false,
  error: null,
};

export const characterListReducer = createReducer(
  initialState,

  on(CharacterListActions.loadCharacterList, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CharacterListActions.loadCharacterListSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null,
  })),

  on(CharacterListActions.loadCharacterListFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
