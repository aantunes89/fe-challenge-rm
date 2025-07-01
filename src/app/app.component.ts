import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HeaderComponent } from '@shared/components/header/header.component';
import * as ThemeSelectors from '@app/shared/store/theme.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private store = inject(Store);

  isDarkMode$: Observable<boolean> = this.store.select(ThemeSelectors.selectIsDarkMode);
}
