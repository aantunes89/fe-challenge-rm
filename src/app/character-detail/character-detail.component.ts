import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCharacter, selectCharacterLoading, selectCharacterError } from './store';
import { Observable } from 'rxjs';
import { Character } from '@app/shared/models/character.interface';

import * as CharacterDetailActions from '@app/character-detail/store/character-detail.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent implements OnInit {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly store = inject(Store);

  character$: Observable<Character | null> = this.store.select(selectCharacter);
  loading$: Observable<boolean> = this.store.select(selectCharacterLoading);
  error$: Observable<string | null> = this.store.select(selectCharacterError);

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        map(params => params.get('id')),
        filter(id => !!id),
        tap(characterId => this.loadCharacterDetails(Number(characterId)))
      )
      .subscribe();
  }

  loadCharacterDetails(id: number) {
    this.store.dispatch(CharacterDetailActions.loadCharacter({ id }));
  }
}
