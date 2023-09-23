import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TuiRootModule } from '@taiga-ui/core';
import { AppComponent } from './app.component';
import { AppStoreModule } from './ngrx/store.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        AppStoreModule,
        TuiRootModule,
        CoreModule,
        AppRoutingModule,
      ],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'eCommerceApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('eCommerceApp');
  });
});
