import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Customer } from '@app/auth/models/customer.model';
import { selectCustomer } from '@app/ngrx/selectors/customer.selector';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { NotificationService } from '@app/shared/services/notofication.service';
import { CustomerActionBuilder } from './services/customer-action-builder.service';

@Component({
  selector: 'ec-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [CustomerActionBuilder],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  public customer!: Customer;
  private sub = new Subscription();
  public customer$ = this.store.select(selectCustomer);

  constructor(
    private store: Store,
    private changeDetector: ChangeDetectorRef,
    public notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.sub.add(
      this.customer$.subscribe((customer) => {
        if (customer) {
          this.customer = customer;
          this.changeDetector.markForCheck();
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
