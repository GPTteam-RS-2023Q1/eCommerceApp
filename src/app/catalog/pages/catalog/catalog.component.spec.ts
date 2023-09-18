import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CatalogModule } from '@app/catalog/catalog.module';
import { CatalogComponent } from './catalog.component';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent],
      imports: [HttpClientTestingModule, CatalogModule],
    });
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
