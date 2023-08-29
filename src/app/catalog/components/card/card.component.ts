import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product, ProductData } from '@app/core/models/product';

@Component({
  selector: 'ec-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input({ required: true }) public product!: Product;

  public activeImage$$ = new BehaviorSubject('');

  constructor(private readonly element: ElementRef) {}

  public get current(): ProductData {
    return this.product.masterData.current;
  }

  public ngOnInit(): void {
    this.activeImage$$.next(this.current.masterVariant.images[0].url);
  }

  @HostListener('mousemove', ['$event'])
  public onMouseMove(event: MouseEvent): void {
    const { images } = this.current.masterVariant;
    const element = this.element.nativeElement;
    const delimeter = element.clientWidth / images.length;
    const relativeMousePosition = event.clientX - element.offsetLeft;

    const imageIndex = Math.floor(relativeMousePosition / delimeter);
    this.activeImage$$.next(images[imageIndex].url);
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.activeImage$$.next(this.current.masterVariant.images[0].url);
  }
}
