import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ec-form-fail-notification',
  templateUrl: './form-fail-notification.component.html',
  styleUrls: ['./form-fail-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFailNotificationComponent implements OnInit, OnDestroy {
  @Input() public parentForm!: FormGroup;
  @Input() public error!: string;
  @Output() public errorHandle = new EventEmitter<string>();

  private sub = new Subscription();

  public ngOnInit(): void {
    this.sub.add(
      this.parentForm.valueChanges.subscribe(() => {
        this.onClose();
      })
    );
  }

  public onClose(): void {
    this.errorHandle.emit('');
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
