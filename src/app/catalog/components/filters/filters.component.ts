import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { QueryBuilderService } from '@app/catalog/services/query-builder.service';

@Component({
  selector: 'ec-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  public readonly form = this.fb.group({
    price: [0],
  });

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private queryBuilder: QueryBuilderService,
    private route: ActivatedRoute
  ) {}
}
