import { ApiError } from '@app/character-list/types/api-error.type';

export function extractApiError(error: any, fallback: string): string {
  const apiError = error?.error as ApiError;
  if (apiError && typeof apiError.error === 'string') {
    return apiError.error;
  } else if (error?.message) {
    return error.message;
  }
  return fallback;
}
