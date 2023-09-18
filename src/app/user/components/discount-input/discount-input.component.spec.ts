import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserModule } from '@app/user/user.module';
import { DiscountInputComponent } from './discount-input.component';

describe('DiscountInputComponent', () => {
  let component: DiscountInputComponent;
  let fixture: ComponentFixture<DiscountInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountInputComponent],
      providers: [provideMockStore({})],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        UserModule,
      ],
    });
    fixture = TestBed.createComponent(DiscountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
