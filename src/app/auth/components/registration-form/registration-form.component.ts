import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ec-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {}
