import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'ec-discount-input',
  templateUrl: './discount-input.component.html',
  styleUrls: ['./discount-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountInputComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: NonNullableFormBuilder) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      promoInput: [null],
    });
  }

  public onSubmit(): void {
    console.log(this.form);
  }
}
