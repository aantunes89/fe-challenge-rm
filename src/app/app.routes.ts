import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@app/home-page/home-page.component').then(c => c.HomePageComponent),
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('@app/character-list/character-list.component').then(c => c.CharacterListComponent),
  },
  {
    path: 'characters/:id',
    loadComponent: () =>
      import('@app/character-detail/character-detail.component').then(
        c => c.CharacterDetailComponent
      ),
  },
];
