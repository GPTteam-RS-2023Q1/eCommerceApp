import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '@app/core/core.module';
import { provideMockStore } from '@ngrx/store/testing';
import { UserMenuComponent } from './user-menu.component';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  const initialState = {
    accessToken: null,
    refreshToken: null,
    errorMessage: null,
    customerId: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [provideMockStore({ initialState })],
    });
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
