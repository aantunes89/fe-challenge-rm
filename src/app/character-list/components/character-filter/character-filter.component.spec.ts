import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CharacterFilterComponent } from './character-filter.component';

describe('CharacterFilterComponent', () => {
  let component: CharacterFilterComponent;
  let fixture: ComponentFixture<CharacterFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterFilterComponent, ReactiveFormsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form values', () => {
    const formValue = component.filterForm.value;
    expect(formValue).toEqual({
      name: '',
      status: '',
      species: '',
      gender: '',
    });
  });

  it('should emit filterChange when form values change', () => {
    const spy = jest.spyOn(component.filterChange, 'emit');

    component.filterForm.patchValue({
      name: 'Rick',
      status: 'alive',
    });

    expect(spy).toHaveBeenCalledWith({
      name: 'Rick',
      status: 'alive',
      species: '',
      gender: '',
    });
  });

  it('should emit applyFilters when filter button is clicked', () => {
    const spy = jest.spyOn(component.applyFilters, 'emit');

    component.filterForm.patchValue({
      name: 'Morty',
      species: 'Human',
    });

    component.onFilterClick();

    expect(spy).toHaveBeenCalledWith({
      name: 'Morty',
      status: '',
      species: 'Human',
      gender: '',
    });
  });

  it('should render all filter inputs', () => {
    const compiled = fixture.nativeElement;

    const nameInputSelector = '.character-filter__input[placeholder="Name"]';
    const speciesInputSelector = '.character-filter__input[placeholder="Species"]';
    const statusSelectSelector = '.character-filter__select[formControlName="status"]';
    const genderSelectSelector = '.character-filter__select[formControlName="gender"]';
    const submitButtonSelector = '.character-filter__button[type="submit"]';

    expect(compiled.querySelector(nameInputSelector)).toBeTruthy();
    expect(compiled.querySelector(speciesInputSelector)).toBeTruthy();
    expect(compiled.querySelector(statusSelectSelector)).toBeTruthy();
    expect(compiled.querySelector(genderSelectSelector)).toBeTruthy();
    expect(compiled.querySelector(submitButtonSelector)).toBeTruthy();
  });

  it('should have correct status options', () => {
    const compiled = fixture.nativeElement;
    const statusSelect = compiled.querySelector('select[formControlName="status"]');
    const options = statusSelect.querySelectorAll('option');

    expect(options[0].textContent).toContain('Any Status');
    expect(options[1].textContent).toContain('Alive');
    expect(options[2].textContent).toContain('Dead');
    expect(options[3].textContent).toContain('Unknown');
  });

  it('should have correct gender options', () => {
    const compiled = fixture.nativeElement;
    const genderSelect = compiled.querySelector('select[formControlName="gender"]');
    const options = genderSelect.querySelectorAll('option');

    expect(options[0].textContent).toContain('Any Gender');
    expect(options[1].textContent).toContain('Female');
    expect(options[2].textContent).toContain('Male');
    expect(options[3].textContent).toContain('Genderless');
    expect(options[4].textContent).toContain('Unknown');
  });

  it('should emit correct values when name field changes', () => {
    const spy = jest.spyOn(component.filterChange, 'emit');
    const nameInput = fixture.nativeElement.querySelector('input[placeholder="Name"]');

    nameInput.value = 'Rick Sanchez';
    nameInput.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith({
      name: 'Rick Sanchez',
      status: '',
      species: '',
      gender: '',
    });
  });

  it('should emit correct values when status field changes', () => {
    const spy = jest.spyOn(component.filterChange, 'emit');
    const statusSelect = fixture.nativeElement.querySelector('select[formControlName="status"]');

    statusSelect.value = 'alive';
    statusSelect.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalledWith({
      name: '',
      status: 'alive',
      species: '',
      gender: '',
    });
  });

  it('should emit correct values when species field changes', () => {
    const spy = jest.spyOn(component.filterChange, 'emit');
    const speciesInput = fixture.nativeElement.querySelector('input[placeholder="Species"]');

    speciesInput.value = 'Human';
    speciesInput.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalledWith({
      name: '',
      status: '',
      species: 'Human',
      gender: '',
    });
  });

  it('should emit correct values when gender field changes', () => {
    const spy = jest.spyOn(component.filterChange, 'emit');
    const genderSelect = fixture.nativeElement.querySelector('select[formControlName="gender"]');

    genderSelect.value = 'male';
    genderSelect.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalledWith({
      name: '',
      status: '',
      species: '',
      gender: 'male',
    });
  });
});
