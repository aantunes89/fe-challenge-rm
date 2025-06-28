import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { CharacterApiService } from './character-api.service';
import { mockCharacter, mockCharacterApiResponse } from '../testing/mocks';

describe('CharacterApiService', () => {
  let service: CharacterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CharacterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get characters successfully', done => {
    jest.spyOn(service['http'], 'get').mockReturnValue(of(mockCharacterApiResponse) as any);

    service.getCharacters().subscribe({
      next: response => {
        expect(response).toEqual(mockCharacterApiResponse);
        expect(service['http'].get).toHaveBeenCalledWith(
          'https://rickandmortyapi.com/api/character?page=1'
        );
        done();
      },
      error: done,
    });
  });

  it('should get character by id successfully', done => {
    jest.spyOn(service['http'], 'get').mockReturnValue(of(mockCharacter) as any);

    service.getCharacterById(1).subscribe({
      next: response => {
        expect(response).toEqual(mockCharacter);
        expect(service['http'].get).toHaveBeenCalledWith(
          'https://rickandmortyapi.com/api/character/1'
        );
        done();
      },
      error: done,
    });
  });

  it('should get characters with custom page', done => {
    jest.spyOn(service['http'], 'get').mockReturnValue(of(mockCharacterApiResponse) as any);

    service.getCharacters(2).subscribe({
      next: response => {
        expect(response).toEqual(mockCharacterApiResponse);
        expect(service['http'].get).toHaveBeenCalledWith(
          'https://rickandmortyapi.com/api/character?page=2'
        );
        done();
      },
      error: done,
    });
  });
});
