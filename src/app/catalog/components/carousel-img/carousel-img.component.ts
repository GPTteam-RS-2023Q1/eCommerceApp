import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Image } from '@app/shared/models/interfaces/product-variant';

@Component({
  selector: 'ec-carousel-img',
  templateUrl: './carousel-img.component.html',
  styleUrls: ['./carousel-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselImgComponent {
  @Input() public imgs!: Image[];

  public open = false;

  public index = 0;

  public onClick(num: number): void {
    this.index = num;
    this.open = true;
  }

  public navigate(delta: number): void {
    if (!(delta === -1 && this.index === 0)) {
      this.index = (this.index + delta) % this.imgs.length;
    }
  }
}
