import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from '@app/core/core.module';
import { AuthMenuComponent } from './auth-menu.component';

describe('AuthMenuComponent', () => {
  let component: AuthMenuComponent;
  let fixture: ComponentFixture<AuthMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
    });
    fixture = TestBed.createComponent(AuthMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
