import { TestBed } from '@angular/core/testing';

import { Regestrationserv } from './regestrationserv';

describe('Regestrationserv', () => {
  let service: Regestrationserv;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Regestrationserv);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
