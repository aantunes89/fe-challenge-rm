import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ThemeActions from '../../store/theme.actions';
import * as ThemeSelectors from '../../store/theme.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private store = inject(Store);

  isDarkMode$: Observable<boolean> = this.store.select(ThemeSelectors.selectIsDarkMode);

  toggleTheme(): void {
    this.store.dispatch(ThemeActions.toggleTheme());
  }
}
