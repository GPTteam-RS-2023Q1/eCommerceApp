import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product } from '@app/core/models/product';
import { Image } from '@app/core/models/product-variant';

@Component({
  selector: 'ec-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() public product?: Product;

  public activeImage$$ = new BehaviorSubject('_');

  public price!: string;

  public images: Image[] = [];

  constructor(private readonly element: ElementRef) {}

  private getPrice(): string {
    const price = this.product?.masterData.current.masterVariant.prices[0];
    if (price) {
      return (Number(price.value.centAmount) / 100).toFixed(2);
    }

    return '';
  }

  private getImages(): Image[] {
    return this.product?.masterData.current.masterVariant.images || [];
  }

  public ngOnInit(): void {
    this.price = this.getPrice();
    this.images = this.getImages();
    this.activeImage$$.next(this.images[0].url);
  }

  @HostListener('mousemove', ['$event'])
  public changeImage(event: MouseEvent): void {
    const element = this.element.nativeElement;
    const delimetr = element.clientWidth / this.images.length;
    const relativeMousePosition = event.clientX - element.offsetLeft;

    const imageIndex = Math.floor(relativeMousePosition / delimetr);
    this.activeImage$$.next(this.images[imageIndex].url);
  }
}
