import { Component, inject, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { take } from 'rxjs/operators';

import { UnsubscribleComponent } from '@app/shared/components/unsubscrible/unsubscrible.component';
import { CharacterCardComponent, CharacterFilterComponent } from '@app/character-list/components';

import * as CharacterListActions from '@app/character-list/store/character-list.actions';
import * as CharacterListSelectors from '@app/character-list/store/character-list.selectors';
import { selectFilters } from '@app/character-list/store/character-list.selectors';

import { hasActiveFilters } from '@app/character-list/utils/has-active-filters';
import { ViewState } from '@app/character-list/enums';
import { CharacterListState, CharacterFilter } from '@app/character-list/types';
import { Character } from '@shared/models/character.interface';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    CharacterCardComponent,
    InfiniteScrollDirective,
    CharacterFilterComponent,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent extends UnsubscribleComponent implements OnInit {
  readonly store = inject(Store<{ characterList: CharacterListState }>);
  readonly router = inject(Router);
  readonly cdr = inject(ChangeDetectorRef);

  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  viewState$: Observable<{ state: ViewState; error?: string }>;

  ViewState = ViewState;

  @ViewChild('grid', { static: false }) gridRef?: ElementRef<HTMLDivElement>;

  constructor() {
    super();

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
    this.store
      .select(selectFilters)
      .pipe(take(1))
      .subscribe((filters: Partial<CharacterFilter>) => {
        if (hasActiveFilters(filters)) {
          this.store.dispatch(CharacterListActions.loadNextFilteredPage());
        } else {
          this.store.dispatch(CharacterListActions.loadNextPage());
        }
      });
  }

  onCardSelected(characterId: number) {
    this.router.navigateByUrl(`/characters/${characterId}`);
  }

  onFilterChange(filter: Partial<CharacterFilter>) {
    this.store.dispatch(CharacterListActions.setFilters({ filters: filter }));
  }

  applyFilters() {
    this.store.dispatch(CharacterListActions.applyFilters());
    this.cdr.detectChanges();
    this.gridRef?.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
