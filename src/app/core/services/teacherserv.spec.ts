import { TestBed } from '@angular/core/testing';

import { Teacherserv } from './teacherserv';

describe('Teacherserv', () => {
  let service: Teacherserv;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Teacherserv);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
