import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Luggage } from './luggage';

describe('Luggage', () => {
  let component: Luggage;
  let fixture: ComponentFixture<Luggage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Luggage]
    }).compileComponents();

    fixture = TestBed.createComponent(Luggage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
