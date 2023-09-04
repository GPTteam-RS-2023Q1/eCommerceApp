import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable, share } from 'rxjs';

import { CategoryService } from '@app/core/services/category.service';

@Component({
  selector: 'ec-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
  public isMenuOpen$: Observable<boolean>;

  constructor(public categoryService: CategoryService) {
    this.isMenuOpen$ = this.categoryService.menuSubject.asObservable().pipe(share());
  }

  public toggleMenu(): void {
    const isOpen = this.categoryService.menuSubject.getValue();
    this.categoryService.menuSubject.next(!isOpen);
  }
}
