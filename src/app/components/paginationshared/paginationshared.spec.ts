import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paginationshared } from './paginationshared';

describe('Paginationshared', () => {
  let component: Paginationshared;
  let fixture: ComponentFixture<Paginationshared>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paginationshared],
    }).compileComponents();

    fixture = TestBed.createComponent(Paginationshared);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
