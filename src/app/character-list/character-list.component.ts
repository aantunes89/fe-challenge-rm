import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Character } from '../shared/models/character.interface';
import { CharacterListState } from './types';
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

  constructor() {
    this.characters$ = this.store.select(CharacterListSelectors.selectCharacters);
    this.loading$ = this.store.select(CharacterListSelectors.selectLoading);
    this.error$ = this.store.select(CharacterListSelectors.selectError);
  }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.store.dispatch(CharacterListActions.loadCharacterList());
  }
}
