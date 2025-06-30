import { hasActiveFilters } from './has-active-filters';

describe('hasActiveFilters', () => {
  it('should return false for empty object', () => {
    const filters = {};
    expect(hasActiveFilters(filters)).toBe(false);
  });

  it('should return true when filters are active', () => {
    const filters = {
      name: 'Rick',
      status: 'alive' as const,
      species: 'Human',
      gender: 'male' as const,
    };
    expect(hasActiveFilters(filters)).toBe(true);
  });
});
