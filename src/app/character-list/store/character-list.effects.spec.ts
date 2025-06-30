import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';

import { CharacterListEffects } from '@app/character-list/store/character-list.effects';
import * as CharacterListActions from '@app/character-list/store/character-list.actions';
import * as CharacterListSelectors from '@app/character-list/store/character-list.selectors';
import { CharacterApiService } from '@shared/data-access/character-api.service';
import { mockCharacterApiResponse } from '@shared/testing/mocks';

describe('CharacterListEffects', () => {
  let actions$: any;
  let effects: CharacterListEffects;
  let characterApiService: jest.Mocked<CharacterApiService>;
  let store: MockStore;

  beforeEach(() => {
    const apiServiceMock = {
      getCharacters: jest.fn().mockReturnValue(of(mockCharacterApiResponse)),
      getCharactersByFilters: jest.fn().mockReturnValue(of(mockCharacterApiResponse)),
    };

    TestBed.configureTestingModule({
      providers: [
        CharacterListEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: CharacterListSelectors.selectPaginationAndFilters,
              value: {
                currentPage: 1,
                totalPages: 42,
                filters: {},
              },
            },
          ],
        }),
        {
          provide: CharacterApiService,
          useValue: apiServiceMock,
        },
      ],
    });

    effects = TestBed.inject(CharacterListEffects);
    characterApiService = TestBed.inject(CharacterApiService) as jest.Mocked<CharacterApiService>;
    store = TestBed.inject(MockStore);
  });

  describe('loadCharacterList$', () => {
    it('should dispatch loadCharacterListSuccess on successful API call', done => {
      const action = CharacterListActions.loadCharacterList();
      const completion = CharacterListActions.loadCharacterListSuccess({
        data: mockCharacterApiResponse.results,
        totalPages: mockCharacterApiResponse.info.pages,
      });

      actions$ = of(action);
      characterApiService.getCharacters.mockReturnValue(of(mockCharacterApiResponse));

      effects.loadCharacterList$.subscribe({
        next: result => {
          expect(result).toEqual(completion);
          done();
        },
        error: done,
      });
    });

    it('should dispatch loadCharacterListFailure on API error', done => {
      const action = CharacterListActions.loadCharacterList();
      const error = { error: { error: 'API Error' } };
      const completion = CharacterListActions.loadCharacterListFailure({
        error: 'API Error',
      });

      actions$ = of(action);
      characterApiService.getCharacters.mockReturnValue(throwError(() => error));

      effects.loadCharacterList$.subscribe({
        next: result => {
          expect(result).toEqual(completion);
          done();
        },
        error: done,
      });
    });
  });

  describe('loadNextPage$', () => {
    it('should dispatch loadNextPageSuccess on successful API call', done => {
      const action = CharacterListActions.loadNextPage();
      const completion = CharacterListActions.loadNextPageSuccess({
        data: mockCharacterApiResponse.results,
        page: 2,
        totalPages: mockCharacterApiResponse.info.pages,
      });

      actions$ = of(action);
      characterApiService.getCharacters.mockReturnValue(of(mockCharacterApiResponse));

      effects.loadNextPage$.subscribe({
        next: result => {
          expect(result).toEqual(completion);
          done();
        },
        error: done,
      });
    });

    it('should not make API call when currentPage >= totalPages', done => {
      store.overrideSelector(CharacterListSelectors.selectPaginationAndFilters, {
        currentPage: 42,
        totalPages: 42,
        filters: {},
      });

      const action = CharacterListActions.loadNextPage();
      actions$ = of(action);

      let emittedCount = 0;
      effects.loadNextPage$.subscribe({
        next: () => {
          emittedCount++;
        },
        error: done,
        complete: () => {
          expect(emittedCount).toBe(0);
          expect(characterApiService.getCharacters).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it('should dispatch loadNextPageFailure on API error', done => {
      const action = CharacterListActions.loadNextPage();
      const error = { error: { error: 'API Error' } };
      const completion = CharacterListActions.loadNextPageFailure({
        error: 'API Error',
        page: 2,
      });

      actions$ = of(action);
      characterApiService.getCharacters.mockReturnValue(throwError(() => error));

      effects.loadNextPage$.subscribe({
        next: result => {
          expect(result).toEqual(completion);
          done();
        },
        error: done,
      });
    });
  });

  describe('loadNextFilteredPage$', () => {
    it('should dispatch loadNextPageSuccess on successful filtered API call', done => {
      const action = CharacterListActions.loadNextFilteredPage();
      const completion = CharacterListActions.loadNextPageSuccess({
        data: mockCharacterApiResponse.results,
        page: 2,
        totalPages: mockCharacterApiResponse.info.pages,
      });

      actions$ = of(action);
      characterApiService.getCharactersByFilters.mockReturnValue(of(mockCharacterApiResponse));

      effects.loadNextFilteredPage$.subscribe({
        next: result => {
          expect(result).toEqual(completion);
          done();
        },
        error: done,
      });
    });

    it('should not make API call when currentPage >= totalPages', done => {
      store.overrideSelector(CharacterListSelectors.selectPaginationAndFilters, {
        currentPage: 42,
        totalPages: 42,
        filters: { name: 'Rick' },
      });

      const action = CharacterListActions.loadNextFilteredPage();
      actions$ = of(action);

      let emittedCount = 0;
      effects.loadNextFilteredPage$.subscribe({
        next: () => {
          emittedCount++;
        },
        error: done,
        complete: () => {
          expect(emittedCount).toBe(0);
          expect(characterApiService.getCharactersByFilters).not.toHaveBeenCalled();
          done();
        },
      });
    });
  });

  describe('applyFilters$', () => {
    it('should dispatch loadCharacterListSuccess when filters are active', done => {
      store.overrideSelector(CharacterListSelectors.selectFilters, { name: 'Rick' });

      const action = CharacterListActions.applyFilters();
      const completion = CharacterListActions.loadCharacterListSuccess({
        data: mockCharacterApiResponse.results,
        totalPages: mockCharacterApiResponse.info.pages,
      });

      actions$ = of(action);
      characterApiService.getCharactersByFilters.mockReturnValue(of(mockCharacterApiResponse));

      effects.applyFilters$.subscribe({
        next: result => {
          expect(result).toEqual(completion);
          done();
        },
        error: done,
      });
    });

    it('should dispatch loadCharacterList when no filters are active', done => {
      store.overrideSelector(CharacterListSelectors.selectFilters, {});

      const action = CharacterListActions.applyFilters();
      const completion = CharacterListActions.loadCharacterList();

      actions$ = of(action);

      effects.applyFilters$.subscribe({
        next: result => {
          expect(result).toEqual(completion);
          done();
        },
        error: done,
      });
    });
  });
});
