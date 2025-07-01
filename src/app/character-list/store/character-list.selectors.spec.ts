import * as CharacterListSelectors from './character-list.selectors';
import { CharacterListState } from '../types/character-list-state.type';

describe('CharacterListSelectors', () => {
  const initialState: CharacterListState = {
    data: [{ id: 1, name: 'Rick' } as any],
    loading: true,
    error: 'error',
    currentPage: 2,
    totalPages: 10,
    filters: { name: 'Rick' },
  };

  it('selectCharacterListState', () => {
    expect(CharacterListSelectors.selectCharacterListState.projector(initialState)).toEqual(
      initialState
    );
  });

  it('selectCharacters', () => {
    expect(CharacterListSelectors.selectCharacters.projector(initialState)).toEqual(
      initialState.data
    );
  });

  it('selectLoading', () => {
    expect(CharacterListSelectors.selectLoading.projector(initialState)).toBe(true);
  });

  it('selectError', () => {
    expect(CharacterListSelectors.selectError.projector(initialState)).toBe('error');
  });

  it('selectCurrentPage', () => {
    expect(CharacterListSelectors.selectCurrentPage.projector(initialState)).toBe(2);
  });

  it('selectFilters', () => {
    expect(CharacterListSelectors.selectFilters.projector(initialState)).toEqual({ name: 'Rick' });
  });

  it('selectTotalPages', () => {
    expect(CharacterListSelectors.selectTotalPages.projector(initialState)).toBe(10);
  });

  it('selectPaginationAndFilters', () => {
    expect(CharacterListSelectors.selectPaginationAndFilters.projector(initialState)).toEqual({
      currentPage: 2,
      totalPages: 10,
      filters: { name: 'Rick' },
    });
  });
});
