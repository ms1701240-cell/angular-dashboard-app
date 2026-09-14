import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalshared } from './modalshared';

describe('Modalshared', () => {
  let component: Modalshared;
  let fixture: ComponentFixture<Modalshared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modalshared],
    }).compileComponents();

    fixture = TestBed.createComponent(Modalshared);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
