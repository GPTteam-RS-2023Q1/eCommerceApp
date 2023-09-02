import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { TuiTreeItemContentComponent } from '@taiga-ui/kit';

@Component({
  selector: 'ec-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeItemComponent extends TuiTreeItemContentComponent {
  @HostBinding()
  @Input()
  public selected = '';

  public expanded = new BehaviorSubject(true);

  public clicked(): void {
    this.onClick();
    this.expanded.next(this.isExpanded);
  }
}
