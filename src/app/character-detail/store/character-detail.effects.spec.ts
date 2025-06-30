import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';

import { CharacterDetailsEffects } from '@app/character-detail/store/character-detail.effects';
import * as CharacterDetailActions from '@app/character-detail/store/character-detail.actions';
import { CharacterApiService } from '@shared/data-access/character-api.service';
import { createCharacterApiServiceMock } from '@shared/testing/mocks/character-api.service.mock';
import { mockCharacter } from '@shared/testing/mocks/character.mock';

describe('CharacterDetailsEffects', () => {
  let effects: CharacterDetailsEffects;
  let actions$: any;
  let characterApiService: jest.Mocked<CharacterApiService>;

  beforeEach(() => {
    characterApiService = createCharacterApiServiceMock();

    TestBed.configureTestingModule({
      providers: [
        CharacterDetailsEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: CharacterApiService,
          useValue: characterApiService,
        },
      ],
    });

    effects = TestBed.inject(CharacterDetailsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadCharacter$', () => {
    it('should dispatch loadCharacterSuccess when API call succeeds', done => {
      const action = CharacterDetailActions.loadCharacter({ id: 1 });
      const completion = CharacterDetailActions.loadCharacterSuccess({ character: mockCharacter });

      actions$ = of(action);
      characterApiService.getCharacterById.mockReturnValue(of(mockCharacter));

      effects.loadCharacter$.subscribe({
        next: result => {
          expect(result).toEqual(completion);
          expect(characterApiService.getCharacterById).toHaveBeenCalledWith(1);
          done();
        },
        error: done,
      });
    });

    it('should dispatch loadCharacterFailure when API call fails', done => {
      const action = CharacterDetailActions.loadCharacter({ id: 1 });
      const error = new Error('API Error');
      const completion = CharacterDetailActions.loadCharacterFailure({
        error: 'API Error',
      });

      actions$ = of(action);
      characterApiService.getCharacterById.mockReturnValue(throwError(() => error));

      effects.loadCharacter$.subscribe({
        next: result => {
          expect(result).toEqual(completion);
          expect(characterApiService.getCharacterById).toHaveBeenCalledWith(1);
          done();
        },
        error: done,
      });
    });

    it('should dispatch loadCharacterFailure with default error message when error has no message', done => {
      const action = CharacterDetailActions.loadCharacter({ id: 1 });
      const error = {};
      const completion = CharacterDetailActions.loadCharacterFailure({
        error: 'Erro ao carregar personagem',
      });

      actions$ = of(action);
      characterApiService.getCharacterById.mockReturnValue(throwError(() => error));

      effects.loadCharacter$.subscribe({
        next: result => {
          expect(result).toEqual(completion);
          expect(characterApiService.getCharacterById).toHaveBeenCalledWith(1);
          done();
        },
        error: done,
      });
    });
  });
});
