import { Character } from '@app/shared/models/character.interface';

export type CharacterDetailState = {
  character: Character | null;
  loading: boolean;
  error: string | null;
};
