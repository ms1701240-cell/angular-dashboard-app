import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInfo } from './medical.info';

describe('MedicalInfo', () => {
  let component: MedicalInfo;
  let fixture: ComponentFixture<MedicalInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
