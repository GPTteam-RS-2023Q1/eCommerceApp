import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogModule } from '@app/catalog/catalog.module';
import { PriceInputComponent } from './price-input.component';

describe('PriceInputComponent', () => {
  let component: PriceInputComponent;
  let fixture: ComponentFixture<PriceInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceInputComponent],
      imports: [CatalogModule],
    });
    fixture = TestBed.createComponent(PriceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
