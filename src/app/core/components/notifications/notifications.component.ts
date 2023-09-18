import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NotificationService, Notify } from '@app/shared/services/notofication.service';

@Component({
  selector: 'ec-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        sequence([
          animate('300ms ease-in-out', style({ transform: 'translateX(100%)' })),
          /* animate('300ms ease-in-out', style({ height: '0px' })), */
        ]),
      ]),
    ]),
  ],
})
export class NotificationsComponent {
  public notifications = this.notifyService.notifies$;

  constructor(private readonly notifyService: NotificationService) {}

  public trackBy(index: number, item: Notify): number {
    return item.id;
  }
}
