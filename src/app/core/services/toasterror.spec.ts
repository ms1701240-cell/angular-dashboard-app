import { TestBed } from '@angular/core/testing';

import { Toasterror } from './toasterror';

describe('Toasterror', () => {
  let service: Toasterror;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Toasterror);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
