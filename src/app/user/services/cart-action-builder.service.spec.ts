import { TestBed } from '@angular/core/testing';

import { CartActionBuilderService } from './cart-action-builder.service';

describe('CartActionBuilderService', () => {
  let service: CartActionBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartActionBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
