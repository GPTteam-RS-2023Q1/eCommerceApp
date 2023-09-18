import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ProductProjection } from '@app/catalog/models/product-projection';
import { ProductVariant } from '@app/shared/models/interfaces/product-variant';

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
      transition(':leave', [animate('0ms 100ms ease', style({ visibility: 'hidden' }))]),
    ]),
  ],
})
export class CardComponent {
  @Input({ required: true }) public product!: ProductProjection;

  @Output() public addToCart = new EventEmitter<ProductVariant>();

  public activeImageIndex$$ = new BehaviorSubject(DEFAULT_IMAGE_INDEX);

  public open = false;

  constructor(private readonly element: ElementRef) {}

  public get variant(): ProductVariant {
    return this.product.masterVariant;
  }

  public openMenu(e: Event): void {
    e.stopPropagation();
    this.open = true;
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

  public selectSize(variant: ProductVariant): void {
    this.addToCart.emit(variant);
    this.open = false;
  }
}
