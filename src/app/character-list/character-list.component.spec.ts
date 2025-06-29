import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CharacterListComponent } from '@app/character-list/character-list.component';
import { CharacterListState } from '@app/character-list/types';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let store: MockStore<CharacterListState>;

  const initialState: CharacterListState = {
    data: [],
    loading: false,
    error: null,
    currentPage: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterListComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCharacters action when component initializes', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalled();
  });
});
