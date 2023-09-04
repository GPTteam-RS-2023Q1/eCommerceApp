import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ProductProjection } from '@app/catalog/models/product-projection';
import { ProductVariant } from '@app/core/models/product-variant';

const DEFAULT_IMAGE_INDEX = 0;

@Component({
  selector: 'ec-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('showHide', [
      transition(':enter', [
        style({ visibility: 'hidden' }),
        animate('0ms', style({ visibility: 'visible' })),
      ]),
      transition(':leave', [animate('0ms 50ms ease', style({ visibility: 'hidden' }))]),
    ]),
  ],
})
export class CardComponent {
  @Input({ required: true }) public product!: ProductProjection;

  public activeImageIndex$$ = new BehaviorSubject(DEFAULT_IMAGE_INDEX);

  public sizes?: string[];

  constructor(private readonly element: ElementRef) {}

  public get variant(): ProductVariant {
    return this.product.masterVariant;
  }

  @HostListener('mousemove', ['$event'])
  public onMouseMove(event: MouseEvent): void {
    const { images } = this.variant;
    const element = this.element.nativeElement as HTMLElement;
    const delimeter = element.clientWidth / images.length;
    const relativeMousePosition = event.clientX - element.getBoundingClientRect().x;

    const imageIndex = Math.floor(relativeMousePosition / delimeter);
    this.activeImageIndex$$.next(imageIndex);
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.activeImageIndex$$.next(DEFAULT_IMAGE_INDEX);
  }

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    if (!this.sizes) {
      this.sizes = this.product.variants.map((variant) => {
        return variant.attributes.find((attribute) => attribute.name === 'size')?.value
          .label;
      });
    }
  }
}
