import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { ProductService } from '@app/catalog/services/product.service';
import { ProductType } from '@app/shared/models/interfaces/product';
import { LineItem } from '@app/user/models/cart.model';
import { CartFacadeService } from '@app/user/services/cart-facade.service';

const DEFAULT_IMAGE_INDEX = 0;

@Component({
  selector: 'ec-card-basket',
  templateUrl: './card-basket.component.html',
  styleUrls: ['./card-basket.component.scss'],
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
export class CardBasketComponent implements OnInit, OnDestroy {
  @Input({ required: true }) public lineItem!: LineItem;

  @Output() public navigate = new EventEmitter<string>();

  @Output() public detele = new EventEmitter<string>();

  @ViewChild('images') private image!: ElementRef;
  public activeImageIndex$$ = new BehaviorSubject(DEFAULT_IMAGE_INDEX);

  public productType$!: Observable<ProductType>;

  public quantity = new FormControl();

  public price!: number;

  public discountedPrice!: number;

  private subs = new Subscription();

  constructor(
    private productService: ProductService,
    private cardFacade: CartFacadeService
  ) {}

  public onMouseMove(event: MouseEvent): void {
    const { images } = this.lineItem.variant;
    const element = this.image.nativeElement as HTMLElement;
    const delimeter = element.clientWidth / images.length;
    const relativeMousePosition = event.clientX - element.getBoundingClientRect().x;

    let imageIndex = Math.floor(relativeMousePosition / delimeter);

    if (imageIndex < 0) {
      imageIndex = 0;
    }

    this.activeImageIndex$$.next(imageIndex);
  }

  public onMouseLeave(): void {
    this.activeImageIndex$$.next(DEFAULT_IMAGE_INDEX);
  }

  public ngOnInit(): void {
    this.productType$ = this.productService.getProductTypeById(
      this.lineItem.productType.id
    );
    this.quantity.setValue(this.lineItem.quantity);
    this.subs.add(
      this.quantity.valueChanges.subscribe((value) => {
        this.cardFacade.changeLineItemQuantity(this.lineItem.id, value);
      })
    );
    this.price = this.lineItem.price.value.centAmount * this.lineItem.quantity;
    this.discountedPrice =
      (this.lineItem.price.discounted?.value.centAmount || 0) * this.lineItem.quantity;
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
