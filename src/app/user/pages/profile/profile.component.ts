import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '@app/auth/models/customer.model';
import { selectCustomer } from '@app/ngrx/selectors/customer.selector';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ec-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  public customer!: Customer;
  private sub = new Subscription();
  public customer$ = this.store.select(selectCustomer);

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.sub.add(
      this.customer$.subscribe((customer) => {
        if (customer) {
          this.customer = customer;
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
