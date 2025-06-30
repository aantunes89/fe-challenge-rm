import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CharacterDetailActions from '@app/character-detail/store/character-detail.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CharacterApiService } from '@shared/data-access/character-api.service';

@Injectable()
export class CharacterDetailsEffects {
  private actions$ = inject(Actions);
  private characterApiService = inject(CharacterApiService);

  loadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterDetailActions.loadCharacter),
      mergeMap(action => {
        console.log(action);
        return this.characterApiService.getCharacterById(action.id).pipe(
          map(character => CharacterDetailActions.loadCharacterSuccess({ character })),
          catchError(error =>
            of(
              CharacterDetailActions.loadCharacterFailure({
                error: error.message || 'Erro ao carregar personagem',
              })
            )
          )
        );
      })
    )
  );
}
