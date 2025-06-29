import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-unsubscrible',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export class UnsubscribleComponent implements OnDestroy {
  destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
