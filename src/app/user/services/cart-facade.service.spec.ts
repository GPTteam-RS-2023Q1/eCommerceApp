import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { CartFacadeService } from './cart-facade.service';

describe('CartFacadeService', () => {
  let service: CartFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CartFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
