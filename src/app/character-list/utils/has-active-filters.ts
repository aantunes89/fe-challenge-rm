import { CharacterFilter } from '@app/character-list/types';

export function hasActiveFilters(filters: CharacterFilter): boolean {
  return Object.values(filters || {}).some(v => v && v !== '');
}
