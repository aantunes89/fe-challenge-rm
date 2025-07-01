import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Character } from '@app/shared/models/character.interface';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent {
  @Input({ required: true }) character!: Character;
  @Input() isDarkMode = false;

  get statusBadge() {
    return this.character.status.toLowerCase();
  }
}
