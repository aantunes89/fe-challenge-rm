import { extractApiError } from './extract-api-error';

describe('extractApiError', () => {
  it('should extract error message from API error object', () => {
    const error = {
      error: {
        error: 'There is nothing here',
      },
    };
    const fallback = 'Default error message';
    expect(extractApiError(error, fallback)).toBe('There is nothing here');
  });

  it('should return fallback message when error structure is invalid', () => {
    const error = { message: null };
    const fallback = 'Default error message';
    expect(extractApiError(error, fallback)).toBe('Default error message');
  });
});
