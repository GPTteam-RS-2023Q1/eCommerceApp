import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ec-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {}
