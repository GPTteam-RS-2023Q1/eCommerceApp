import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { TuiNotificationT } from '@taiga-ui/core';

export interface Notify {
  id: number;
  message: string;
  status: TuiNotificationT;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifies$$ = new BehaviorSubject<Notify[]>([]);

  public notifies$ = this.notifies$$.pipe();

  private notifyId = 0;

  public notify(message: string, status: TuiNotificationT, time?: number): void {
    const notification = { id: this.notifyId++, message, status };

    this.notifies$$.next([...this.notifies$$.getValue(), notification]);
    setTimeout(() => {
      this.hideNotification(notification);
    }, time || 3000);
  }

  public hideNotification(notification: Notify): void {
    this.notifies$$.next(
      this.notifies$$.getValue().filter((notify) => notify !== notification)
    );
  }
}
