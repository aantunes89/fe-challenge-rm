import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CharacterFilter } from '@app/character-list/types/character-filter.type';

@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrls: ['./character-filter.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CharacterFilterComponent {
  @Output() filterChange = new EventEmitter<CharacterFilter>();
  @Output() applyFilters = new EventEmitter<CharacterFilter>();

  filterForm: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.filterForm = this.fb.group({
      name: [''],
      status: [''],
      species: [''],
      gender: [''],
    });
    this.filterForm.valueChanges.subscribe(value => {
      this.filterChange.emit(value);
    });
  }

  onFilterClick() {
    this.applyFilters.emit(this.filterForm.getRawValue());
  }
}
