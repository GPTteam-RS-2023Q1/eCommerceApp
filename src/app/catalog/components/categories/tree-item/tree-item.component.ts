import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TuiTreeItemContentComponent } from '@taiga-ui/kit';

@Component({
  selector: 'ec-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeItemComponent extends TuiTreeItemContentComponent {
  public click(): void {
    console.log(this.context.$implicit);
  }
}
