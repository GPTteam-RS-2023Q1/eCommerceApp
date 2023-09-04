import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { Color } from '@app/catalog/models/enums/colors.enums';
import { Season } from '@app/catalog/models/enums/season.enum';
import { Pattern } from '@app/catalog/models/enums/patern.enum';
import { take } from 'rxjs';

@Component({
  selector: 'ec-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterModalComponent implements OnInit {
  public colors = Object.values(Color);
  public seasons = Object.values(Season);
  public pattern = Object.values(Pattern);
  public maxPrice = 516;
  public minPrice = 0;
  public form!: FormGroup;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean>,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      colors: [],
      seasons: [],
      patterns: [],
      price: [[this.minPrice, this.maxPrice]],
    });

    this.route.queryParamMap.pipe(take(1)).subscribe((params) => {
      console.log(params);
      console.log(params.getAll('colors'));

      const priceParams = params.getAll('price').map((value) => Number(value));
      this.form.patchValue({
        colors: params.getAll('colors'),
        seasons: params.getAll('seasons'),
        patterns: params.getAll('patterns'),
        price: priceParams.length < 2 ? [this.minPrice, this.maxPrice] : priceParams,
      });
    });
  }

  public onSubmit(): void {
    console.log(this.form);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.form.value,
    });
    console.log(this.route.queryParams);

    this.context.completeWith(true);
  }

  public reset(): void {
    this.context.completeWith(false);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }
}
