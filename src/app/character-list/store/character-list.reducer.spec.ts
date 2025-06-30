import { characterListReducer } from './character-list.reducer';
import * as CharacterListActions from './character-list.actions';
import { CharacterListState } from '../types/character-list-state.type';
import { mockCharacterApiResponse, mockCharacter } from '@shared/testing/mocks';

describe('CharacterListReducer', () => {
  const initialState: CharacterListState = {
    data: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: null,
    filters: {},
  };

  it('should handle loadCharacterList', () => {
    const state = { ...initialState, error: 'Previous error' };
    const action = CharacterListActions.loadCharacterList();
    const result = characterListReducer(state, action);

    expect(result.loading).toBe(true);
    expect(result.error).toBe(null);
  });

  it('should handle loadCharacterListSuccess', () => {
    const state = { ...initialState, loading: true };
    const action = CharacterListActions.loadCharacterListSuccess({
      data: mockCharacterApiResponse.results,
      totalPages: mockCharacterApiResponse.info.pages,
    });
    const result = characterListReducer(state, action);

    expect(result.loading).toBe(false);
    expect(result.data).toEqual(mockCharacterApiResponse.results);
  });

  it('should handle loadCharacterListFailure', () => {
    const state = { ...initialState, loading: true };
    const action = CharacterListActions.loadCharacterListFailure({ error: 'API Error' });
    const result = characterListReducer(state, action);

    expect(result.loading).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should handle loadNextPage', () => {
    const state = { ...initialState, currentPage: 1 };
    const action = CharacterListActions.loadNextPage();
    const result = characterListReducer(state, action);

    expect(result.currentPage).toBe(2);
  });

  it('should handle loadNextPageSuccess', () => {
    const existingData = [mockCharacter];
    const newData = [{ ...mockCharacter, id: 2, name: 'Morty' }];
    const state = { ...initialState, data: existingData, currentPage: 1 };
    const action = CharacterListActions.loadNextPageSuccess({
      data: newData,
      page: 2,
      totalPages: 42,
    });
    const result = characterListReducer(state, action);

    expect(result.data).toEqual([...existingData, ...newData]);
    expect(result.currentPage).toBe(2);
  });

  it('should handle loadNextPageFailure', () => {
    const state = { ...initialState, currentPage: 2 };
    const action = CharacterListActions.loadNextPageFailure({ error: 'API Error', page: 2 });
    const result = characterListReducer(state, action);

    expect(result.currentPage).toBe(1);
    expect(result.error).toBe('API Error');
  });

  it('should handle loadNextFilteredPage', () => {
    const state = { ...initialState, currentPage: 1 };
    const action = CharacterListActions.loadNextFilteredPage();
    const result = characterListReducer(state, action);

    expect(result.currentPage).toBe(2);
  });

  it('should handle setFilters', () => {
    const state = { ...initialState, currentPage: 5, data: [mockCharacter] };
    const newFilters = { name: 'Rick', status: 'alive' as const };
    const action = CharacterListActions.setFilters({ filters: newFilters });
    const result = characterListReducer(state, action);

    expect(result.filters).toEqual(newFilters);
    expect(result.currentPage).toBe(1);
  });

  it('should handle applyFilters', () => {
    const state = { ...initialState, error: 'Previous error' };
    const action = CharacterListActions.applyFilters();
    const result = characterListReducer(state, action);

    expect(result.loading).toBe(true);
    expect(result.error).toBe(null);
  });

  it('should return the same state for unknown action', () => {
    const state = { ...initialState };
    const action = { type: 'UNKNOWN_ACTION' };
    const result = characterListReducer(state, action as any);

    expect(result).toBe(state);
  });
});
