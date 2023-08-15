import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ec-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  public index = 0;

  public readonly items = [
    ['../../../../assets/banner.avif', '../../../../assets/banner1.avif'],
    ['../../../../assets/banner2.avif', '../../../../assets/banner3.avif'],
    ['../../../../assets/banner4.avif', '../../../../assets/banner5.avif'],
    ['../../../../assets/banner6.avif', '../../../../assets/banner7.avif'],
  ];

  constructor(private router: Router) {}

  public toCatalog(): void {
    this.router.navigate(['store/catalog']);
  }
}
