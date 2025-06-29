import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';

import { Character } from '../shared/models/character.interface';
import { CharacterListState } from './types';
import { ViewState } from './enums';
import * as CharacterListActions from './store/character-list.actions';
import * as CharacterListSelectors from './store/character-list.selectors';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit {
  readonly store = inject(Store<{ characterList: CharacterListState }>);

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
}
