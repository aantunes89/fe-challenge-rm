import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import * as CharacterDetailActions from '@app/character-detail/store/character-detail.actions';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent implements OnInit {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly store = inject(Store);

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
