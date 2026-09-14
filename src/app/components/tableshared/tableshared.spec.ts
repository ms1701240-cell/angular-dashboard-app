import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableshared } from './tableshared';

describe('Tableshared', () => {
  let component: Tableshared;
  let fixture: ComponentFixture<Tableshared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tableshared],
    }).compileComponents();

    fixture = TestBed.createComponent(Tableshared);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
