import { TestBed } from '@angular/core/testing';

import { CartFacadeService } from './cart-facade.service';

describe('CartFacadeService', () => {
  let service: CartFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
