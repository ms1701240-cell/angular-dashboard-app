import { TestBed } from '@angular/core/testing';

import { Datanotification } from './datanotification';

describe('Datanotification', () => {
  let service: Datanotification;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Datanotification);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
