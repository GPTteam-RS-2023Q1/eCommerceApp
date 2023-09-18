import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CardBasketComponent } from './card-basket.component';

describe('CardBasketComponent', () => {
  let component: CardBasketComponent;
  let fixture: ComponentFixture<CardBasketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardBasketComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CardBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
