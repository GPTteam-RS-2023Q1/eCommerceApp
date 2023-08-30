import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ec-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  public startIndex = 0;

  public countBanner = 4;

  public items = new Array(this.countBanner).fill('');

  constructor(private router: Router, private route: ActivatedRoute) {}

  public toCatalog(): void {
    this.router.navigate(['store/catalog']);
  }

  public getBannerUrl(item: number, index: number): string {
    return `url(../../../../assets/banner${item}.${index}.avif)`;
  }
}
