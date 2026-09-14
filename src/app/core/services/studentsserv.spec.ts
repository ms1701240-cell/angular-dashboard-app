import { TestBed } from '@angular/core/testing';

import { Studentsservices } from './studentsserv.services';

describe('Studentsservices', () => {
  let service: Studentsservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Studentsservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
