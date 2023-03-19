import { TestBed } from '@angular/core/testing';

import { FoodsaverGuard } from './foodsaver.guard';

describe('FoodsaverGuard', () => {
  let guard: FoodsaverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FoodsaverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
