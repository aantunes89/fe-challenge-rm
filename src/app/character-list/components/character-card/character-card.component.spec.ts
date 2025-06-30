import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from '@app/character-list/components/character-card/character-card.component';
import { mockCharacter } from '@app/shared/testing/mocks';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    component.character = mockCharacter;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display character name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.character-card__title').textContent).toContain('Rick Sanchez');
  });

  it('should display character image with correct alt text', () => {
    const compiled = fixture.nativeElement;
    const image = compiled.querySelector('.character-card__image');
    expect(image.src).toContain('avatar/1.jpeg');
    expect(image.alt).toBe('Picture of Rick Sanchez');
  });

  it('should display character status with correct CSS class', () => {
    const compiled = fixture.nativeElement;
    const statusText = compiled.querySelector('.character-card__status-text');
    const statusDot = compiled.querySelector('.character-card__status-dot');

    expect(statusText.textContent.trim()).toBe('Alive');
    expect(statusDot.classList.contains('character-card__status-dot--alive')).toBe(true);
  });

  it('should display character details correctly', () => {
    const compiled = fixture.nativeElement;
    const detailValues = compiled.querySelectorAll('.character-card__detail-value');

    expect(detailValues[0].textContent.trim()).toBe('Human');
    expect(detailValues[1].textContent.trim()).toBe('Male');
    expect(detailValues[2].textContent.trim()).toBe('Earth (C-137)');
  });
  it('should return lowercase status', () => {
    component.character = { ...mockCharacter, status: 'Alive' };
    expect(component.statusBadge).toBe('alive');
  });

  it('should return lowercase status for different statuses', () => {
    component.character = { ...mockCharacter, status: 'Dead' };
    expect(component.statusBadge).toBe('dead');

    component.character = { ...mockCharacter, status: 'unknown' };
    expect(component.statusBadge).toBe('unknown');
  });
});
