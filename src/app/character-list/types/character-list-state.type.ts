import { Character } from '@app/shared/models/character.interface';
import { CharacterFilter } from '@app/character-list/types';

export type CharacterListState = {
  data: Character[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  filters: Partial<CharacterFilter>;
  totalPages: number | null;
};

export const initialState: CharacterListState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  filters: {},
  totalPages: null,
};
