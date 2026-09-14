import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teacherdetails } from './teacherdetails';

describe('Teacherdetails', () => {
  let component: Teacherdetails;
  let fixture: ComponentFixture<Teacherdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Teacherdetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Teacherdetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
