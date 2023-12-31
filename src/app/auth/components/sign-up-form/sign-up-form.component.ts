import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { numbersValidator } from '@app/auth/validators/numbers-validator';
import { specialCharactersValidator } from '@app/auth/validators/special-characters-validator';
import { whiteSpaceValidator } from '@app/auth/validators/white-space-validator';
import { authAction } from '@app/ngrx/actions/auth.actions';
import { CustomerBuilderService } from '@app/user/services/customer-builder.service';
import { compareObjects } from '@app/utils/compareObjects';

@Component({
  selector: 'ec-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CustomerBuilderService],
})
export class SignUpFormComponent implements OnInit {
  public form!: FormGroup;

  private addressSubscriptions: Subscription[] = [];

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly customerBuilder: CustomerBuilderService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.createForm();
    this.matchLogic();
  }

  public onSubmit(): void {
    const { value } = this.form;

    const builder = this.customerBuilder.createCustomer({
      ...value,
      dateOfBirth: value.dateOfBirth.toLocalNativeDate(),
    });

    if (value.defaultBillingAddress) {
      builder.withDefaultBillingAddress();
    }

    if (value.defaultShippingAddress) {
      builder.withDefaultShippingAddress();
    }

    const customerDraft = builder.getCustomer();

    this.store.dispatch(authAction.signUpStart({ body: customerDraft }));
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: [''],
      password: [''],
      firstName: [
        '',
        [
          Validators.required,
          whiteSpaceValidator(),
          numbersValidator(),
          specialCharactersValidator(),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          whiteSpaceValidator(),
          numbersValidator(),
          specialCharactersValidator(),
        ],
      ],
      dateOfBirth: [null],
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

            if (compareObjects(addressValue, anotherAddress.getRawValue())) {
              return;
            }

            anotherAddress?.patchValue(addressValue, { emitEvent: false });
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
