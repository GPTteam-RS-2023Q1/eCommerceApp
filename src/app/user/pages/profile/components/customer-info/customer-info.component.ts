import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Inject,
  Injector,
} from '@angular/core';
import { Customer } from '@app/auth/models/customer.model';
import { TuiDialogService } from '@taiga-ui/core';
import { tuiAvatarOptionsProvider } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { PasswordDialogComponent } from '../dialogs/password-dialog/password-dialog.component';

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

  constructor(
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {}

  public edit(): void {
    console.log(this.customer);
  }

  public changePassword(): void {
    console.log(this.customer);
    this.dialogs
      .open(new PolymorpheusComponent(PasswordDialogComponent, this.injector))
      .subscribe();
  }
}
