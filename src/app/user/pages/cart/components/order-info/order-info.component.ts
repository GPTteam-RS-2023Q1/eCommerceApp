import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cart } from '@app/user/models/cart.model';

@Component({
  selector: 'ec-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderInfoComponent {
  @Input({ required: true }) public cart!: Cart | null;
}
