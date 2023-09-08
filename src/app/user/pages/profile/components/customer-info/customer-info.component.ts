import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnDestroy,
} from '@angular/core';

import { Subscription } from 'rxjs';

import { Customer } from '@app/auth/models/customer.model';
import { NotificationService } from '@app/shared/services/notofication.service';
import { TuiDialogService } from '@taiga-ui/core';
import { tuiAvatarOptionsProvider } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

import { PasswordDialogComponent } from '../dialogs/password-dialog/password-dialog.component';
import { UserInfoDialogComponent } from '../dialogs/user-info-dialog/user-info-dialog.component';

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
export class CustomerInfoComponent implements OnDestroy {
  @Input() public customer!: Customer;
  private subs = new Subscription();

  constructor(
    private readonly injector: Injector,
    private readonly dialogs: TuiDialogService,
    private notificationServive: NotificationService
  ) {}

  public edit(): void {
    this.subs.add(
      this.dialogs
        .open<boolean>(new PolymorpheusComponent(UserInfoDialogComponent, this.injector))
        .subscribe((status) => {
          if (status) {
            this.notificationServive.smallNotify(
              'Информация о пользователе изменена.',
              3000
            );
          }
        })
    );
  }

  public changePassword(): void {
    this.subs.add(
      this.dialogs
        .open<boolean>(new PolymorpheusComponent(PasswordDialogComponent, this.injector))
        .subscribe((status) => {
          if (status) {
            this.notificationServive.smallNotify(
              'Ваш пароль изменен. Перелогинивание...',
              3000
            );
          }
        })
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
