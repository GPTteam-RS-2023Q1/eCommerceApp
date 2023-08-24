import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Customer } from '@app/auth/models/customer.model';
import { tuiAvatarOptionsProvider } from '@taiga-ui/kit';

@Component({
  selector: 'ec-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiAvatarOptionsProvider({
      size: 'l',
      autoColor: true,
      rounded: true,
    }),
  ],
})
export class CustomerInfoComponent {
  @Input() public customer!: Customer;

  public edit(): void {
    console.log(this.customer);
  }
}
