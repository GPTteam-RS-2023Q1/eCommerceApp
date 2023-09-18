import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CartFacadeService } from '@app/user/services/cart-facade.service';

@Component({
  selector: 'ec-discount-input',
  templateUrl: './discount-input.component.html',
  styleUrls: ['./discount-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountInputComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    public cartFacadeService: CartFacadeService
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      promoInput: [null],
    });
  }

  public onSubmit(): void {
    this.cartFacadeService.addDiscountCode(this.form.value.promoInput);
    this.form.value.promoInput = '';
  }
}
