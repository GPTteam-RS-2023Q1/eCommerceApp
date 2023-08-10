import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'ec-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'eCommerceApp';

  constructor(private authServive: AuthService, private store: Store) {
    this.authServive.autoLogin();
  }
}
