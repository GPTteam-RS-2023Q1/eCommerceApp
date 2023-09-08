import { TestBed } from '@angular/core/testing';

import { CustomerBuilderService } from './customer-builder.service';

describe('CustomerBuilderService', () => {
  let service: CustomerBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
