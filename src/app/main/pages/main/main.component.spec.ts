import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { MaimRoutingModule } from '@app/main/main-routing.module';
import { TuiCarouselModule, TuiIslandModule, TuiPaginationModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { CatalogComponent } from '../catalog/catalog.component';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent, CatalogComponent],
      imports: [
        CommonModule,
        MaimRoutingModule,
        TuiCarouselModule,
        TuiIslandModule,
        TuiPaginationModule,
        TuiButtonModule,
        RouterTestingModule,
      ],
    });
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
