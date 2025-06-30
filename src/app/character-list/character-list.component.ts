import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';

import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

import { Character } from '@shared/models/character.interface';
import { CharacterListState } from '@app/character-list/types';
import { ViewState } from '@app/character-list/enums';
import * as CharacterListActions from '@app/character-list/store/character-list.actions';
import * as CharacterListSelectors from '@app/character-list/store/character-list.selectors';
import { CharacterCardComponent } from '@app/character-list/components/character-card/character-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, InfiniteScrollDirective],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit {
  readonly store = inject(Store<{ characterList: CharacterListState }>);
  readonly router = inject(Router);

  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  viewState$: Observable<{ state: ViewState; error?: string }>;

  ViewState = ViewState;

  constructor() {
    this.characters$ = this.store.select(CharacterListSelectors.selectCharacters);
    this.loading$ = this.store.select(CharacterListSelectors.selectLoading);
    this.error$ = this.store.select(CharacterListSelectors.selectError);

    this.viewState$ = combineLatest([this.loading$, this.error$, this.characters$]).pipe(
      map(([loading, error, _characters]) => {
        if (loading) return { state: ViewState.LOADING };
        if (error) return { state: ViewState.ERROR, error };
        return { state: ViewState.CONTENT };
      })
    );
  }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.store.dispatch(CharacterListActions.loadCharacterList());
  }

  onScroll() {
    this.store.dispatch(CharacterListActions.loadNextPage());
  }

  onCardSelected(characterId: number) {
    this.router.navigateByUrl(`/characters/${characterId}`);
  }
}
