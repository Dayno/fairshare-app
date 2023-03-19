import { TestBed } from '@angular/core/testing';

import { PointGuard } from './point.guard';

describe('PointGuard', () => {
  let guard: PointGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PointGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
