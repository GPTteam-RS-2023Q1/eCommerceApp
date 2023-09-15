import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cart } from '@app/user/models/cart.model';

@Component({
  selector: 'ec-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalPriceComponent {
  @Input({ required: true }) public cart!: Cart | null;
}
