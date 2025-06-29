import { Character } from '@app/shared/models/character.interface';

export interface CharacterListState {
  data: Character[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}
