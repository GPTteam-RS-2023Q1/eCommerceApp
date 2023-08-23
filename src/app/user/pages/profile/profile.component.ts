import { ChangeDetectionStrategy, Component } from '@angular/core';
import { selectCustomer } from '@app/ngrx/selectors/profle.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ec-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public customer$ = this.store.select(selectCustomer);

  constructor(private store: Store) {}
}
