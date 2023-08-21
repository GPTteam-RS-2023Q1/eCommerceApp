import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ec-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  public toSignUp(): void {
    this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
  }
}
