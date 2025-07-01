import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ThemeSelectors from '@app/shared/store/theme.selectors';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private store = inject(Store);

  isDarkMode$: Observable<boolean> = this.store.select(ThemeSelectors.selectIsDarkMode);
}
