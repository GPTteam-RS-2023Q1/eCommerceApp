import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'ec-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'eCommerceApp';

  constructor(private authServive: AuthService) {}

  public ngOnInit(): void {
    this.authServive.autoLogin(localStorage.getItem('authData'));
  }
}
