import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  public readonly notification = new Subject<string>();

  public notify(message: string): void {
    this.notification.next(message);
  }

  public smallNotify(message: string, time: number): void {
    setTimeout(() => {
      this.notify('');
    }, time);
    this.notify(message);
  }
}
