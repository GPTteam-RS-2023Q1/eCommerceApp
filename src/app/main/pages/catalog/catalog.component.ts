import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ec-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {}
