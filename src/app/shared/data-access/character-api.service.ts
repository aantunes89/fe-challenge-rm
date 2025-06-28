import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character.interface';
import { CharacterApiResponse } from '../models/character-api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  getCharacters(page: number = 1): Observable<CharacterApiResponse> {
    return this.http.get<CharacterApiResponse>(`${this.baseUrl}/character?page=${page}`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }
}
