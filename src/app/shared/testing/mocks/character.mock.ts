import { Character } from '../../models/character.interface';
import { CharacterApiResponse } from '../../models/character-api-response.interface';

export const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

export const mockCharacter2: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  url: 'https://rickandmortyapi.com/api/character/2',
  created: '2017-11-04T18:50:21.651Z',
};

export const mockCharacterApiResponse: CharacterApiResponse = {
  info: {
    count: 2,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [mockCharacter, mockCharacter2],
};

export const mockCharacterApiResponseWithPagination: CharacterApiResponse = {
  info: {
    count: 826,
    pages: 42,
    next: 'https://rickandmortyapi.com/api/character?page=2',
    prev: null,
  },
  results: [mockCharacter, mockCharacter2],
};

// Factory function para criar mocks dinâmicos
export const createMockCharacter = (overrides: Partial<Character> = {}): Character => ({
  ...mockCharacter,
  ...overrides,
});

export const createMockCharacterApiResponse = (
  overrides: Partial<CharacterApiResponse> = {}
): CharacterApiResponse => ({
  ...mockCharacterApiResponse,
  ...overrides,
});
