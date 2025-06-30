import {
  characterDetailReducer,
  initialState,
} from '@app/character-detail/store/character-detail.reducer';
import * as CharacterDetailActions from '@app/character-detail/store/character-detail.actions';
import { mockCharacter } from '@shared/testing/mocks/character.mock';

describe('CharacterDetailReducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = { type: 'Unknown' };
      const result = characterDetailReducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('loadCharacter', () => {
    it('should set loading to true and clear error', () => {
      const currentState = {
        character: mockCharacter,
        loading: false,
        error: 'Previous error',
      };

      const action = CharacterDetailActions.loadCharacter({ id: 1 });
      const result = characterDetailReducer(currentState, action);

      expect(result).toEqual({
        character: mockCharacter,
        loading: true,
        error: null,
      });
    });

    it('should set loading to true from initial state', () => {
      const action = CharacterDetailActions.loadCharacter({ id: 1 });
      const result = characterDetailReducer(initialState, action);

      expect(result).toEqual({
        character: null,
        loading: true,
        error: null,
      });
    });
  });

  describe('loadCharacterSuccess', () => {
    it('should set character, set loading to false, and clear error', () => {
      const currentState = {
        character: null,
        loading: true,
        error: 'Previous error',
      };

      const action = CharacterDetailActions.loadCharacterSuccess({ character: mockCharacter });
      const result = characterDetailReducer(currentState, action);

      expect(result).toEqual({
        character: mockCharacter,
        loading: false,
        error: null,
      });
    });

    it('should update character from initial state', () => {
      const action = CharacterDetailActions.loadCharacterSuccess({ character: mockCharacter });
      const result = characterDetailReducer(initialState, action);

      expect(result).toEqual({
        character: mockCharacter,
        loading: false,
        error: null,
      });
    });
  });

  describe('loadCharacterFailure', () => {
    it('should set loading to false and set error message', () => {
      const currentState = {
        character: mockCharacter,
        loading: true,
        error: null,
      };

      const action = CharacterDetailActions.loadCharacterFailure({ error: 'API Error' });
      const result = characterDetailReducer(currentState, action);

      expect(result).toEqual({
        character: mockCharacter,
        loading: false,
        error: 'API Error',
      });
    });

    it('should set error from initial state', () => {
      const action = CharacterDetailActions.loadCharacterFailure({ error: 'API Error' });
      const result = characterDetailReducer(initialState, action);

      expect(result).toEqual({
        character: null,
        loading: false,
        error: 'API Error',
      });
    });
  });
});
