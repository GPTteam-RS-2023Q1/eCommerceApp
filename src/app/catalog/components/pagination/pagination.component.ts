import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs';

@Component({
  selector: 'ec-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input({ required: true }) public length!: number;

  public index$ = this.route.queryParams.pipe(
    map((params) => Number(params['page']) - 1)
  );

  public activePadding = 2;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  public onIndexChange(index: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: index + 1 },
      queryParamsHandling: 'merge',
    });
  }
}
