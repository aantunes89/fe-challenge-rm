import { of, throwError } from 'rxjs';
import { CharacterApiService } from '@shared/data-access/character-api.service';
import { mockCharacterApiResponse, mockCharacter } from './character.mock';

export function createCharacterApiServiceMock(): jest.Mocked<CharacterApiService> {
  return {
    getCharacters: jest.fn().mockReturnValue(of(mockCharacterApiResponse)),
    getCharactersByFilters: jest.fn().mockReturnValue(of(mockCharacterApiResponse)),
    getCharacterById: jest.fn().mockReturnValue(of(mockCharacter)),
  } as any;
}

export function createCharacterApiServiceMockWithError(
  error: any
): jest.Mocked<CharacterApiService> {
  return {
    getCharacters: jest.fn().mockReturnValue(throwError(() => error)),
    getCharactersByFilters: jest.fn().mockReturnValue(throwError(() => error)),
    getCharacterById: jest.fn().mockReturnValue(throwError(() => error)),
  } as any;
}
