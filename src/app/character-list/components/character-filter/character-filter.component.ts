import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

export interface CharacterFilter {
  name?: string;
  status?: 'alive' | 'dead' | 'unknown' | '';
  species?: string;
  type?: string;
  gender?: 'female' | 'male' | 'genderless' | 'unknown' | '';
}

@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrls: ['./character-filter.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CharacterFilterComponent {
  @Output() filterChange = new EventEmitter<CharacterFilter>();

  filterForm: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.filterForm = this.fb.group({
      name: [''],
      status: [''],
      species: [''],
      type: [''],
      gender: [''],
    });
  }

  onFilterClick() {
    this.filterChange.emit(this.filterForm.value);
  }
}
