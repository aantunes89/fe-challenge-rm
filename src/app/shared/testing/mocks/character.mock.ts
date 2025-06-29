import { Character } from '../../models/character.interface';
import { CharacterApiResponse } from '../../models/character-api-response.interface';
import { API_CONFIG } from '../../config/api.config';

export const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOCATIONS}/1`,
  },
  location: {
    name: 'Citadel of Ricks',
    url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOCATIONS}/3`,
  },
  image: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}/avatar/1.jpeg`,
  url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}/1`,
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
    url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOCATIONS}/1`,
  },
  location: {
    name: 'Citadel of Ricks',
    url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOCATIONS}/3`,
  },
  image: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}/avatar/2.jpeg`,
  url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}/2`,
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
    next: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}?page=2`,
    prev: null,
  },
  results: [mockCharacter, mockCharacter2],
};

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
