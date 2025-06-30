export type CharacterFilter = {
  name?: string;
  status?: 'alive' | 'dead' | 'unknown' | '';
  species?: string;
  gender?: 'female' | 'male' | 'genderless' | 'unknown' | '';
};
