import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Character } from '@shared/models/character.interface';
import { CharacterApiResponse } from '@shared/models/character-api-response.interface';
import { API_CONFIG } from '@shared/config/api.config';
import { CharacterFilter } from '@app/character-list/types';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  readonly http = inject(HttpClient);

  getCharacters(page: number = 1): Observable<CharacterApiResponse> {
    return this.http.get<CharacterApiResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}?page=${page}`
    );
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}/${id}`
    );
  }

  getCharactersByFilters(
    filters: CharacterFilter = {},
    page: number = 1
  ): Observable<CharacterApiResponse> {
    const params = { ...filters, page };
    return this.http.get<CharacterApiResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}`,
      { params }
    );
  }
}
