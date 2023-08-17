import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { birthdayValidator } from '@app/auth/validators/birthday-validator';

@Component({
  selector: 'ec-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
  public form!: FormGroup;

  private addressSubscriptions: Subscription[] = [];

  constructor(private readonly fb: NonNullableFormBuilder) {}

  public ngOnInit(): void {
    this.createForm();
    this.matchLogic();
  }

  public onSubmit(): void {}

  private createForm(): void {
    this.form = this.fb.group({
      email: [''],
      password: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null, birthdayValidator],
      matchForms: [true],
      shippingAddress: {
        country: '',
        city: '',
        street: '',
        postalCode: '',
      },
      billingAddress: {
        country: '',
        city: '',
        street: '',
        postalCode: '',
      },
      defaultShippingAddress: [false],
      defaultBillingAddress: [false],
    });
  }

  private matchControls(...controlNames: string[]): void {
    const addresses = controlNames.map((controlName) => this.form.get(controlName));

    addresses.forEach((address) => {
      addresses.forEach((anotherAddress) => {
        if (!address || !anotherAddress || address === anotherAddress) {
          return;
        }

        anotherAddress.patchValue(address?.value);

        this.addressSubscriptions.push(
          address.valueChanges.subscribe(() => {
            const addressValue = address.value;

            if (
              JSON.stringify(addressValue) ===
              JSON.stringify(anotherAddress?.getRawValue())
            ) {
              return;
            }

            anotherAddress?.patchValue(addressValue, { emitEvent: false });
            anotherAddress?.enable();
          })
        );
      });
    });
  }

  private unmatchControls(): void {
    this.addressSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  private matchLogic(): void {
    const matchControl = this.form.get('matchForms');

    if (matchControl?.value) {
      this.matchControls('shippingAddress', 'billingAddress');
    }

    matchControl?.valueChanges.subscribe((value) => {
      if (value) {
        this.matchControls('shippingAddress', 'billingAddress');

        return;
      }

      this.unmatchControls();
    });
  }
}
