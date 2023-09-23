import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@app/shared/services/notofication.service';

@Component({
  selector: 'ec-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  public startIndex = 0;

  public countBanner = 4;

  public promoCodes = ['UTIALOX', 'VULKAN'];

  public items = new Array(this.countBanner).fill('');

  constructor(private router: Router, private notificationService: NotificationService) {}

  public toCatalog(): void {
    this.router.navigate(['store/catalog']);
  }

  public getBannerUrl(item: number, index: number): string {
    return `url(../../../../assets/banner${item}.${index}.avif)`;
  }

  public copyPromo(promo: string): void {
    navigator.clipboard.writeText(promo);
    this.notificationService.notify('Промкод успешно скопирован', 'success');
  }
}
