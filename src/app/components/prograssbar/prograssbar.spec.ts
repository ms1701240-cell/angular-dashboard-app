import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prograssbar } from './prograssbar';

describe('Prograssbar', () => {
  let component: Prograssbar;
  let fixture: ComponentFixture<Prograssbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prograssbar],
    }).compileComponents();

    fixture = TestBed.createComponent(Prograssbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
