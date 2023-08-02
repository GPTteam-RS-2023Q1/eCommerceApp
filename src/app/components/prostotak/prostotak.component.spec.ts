import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProstotakComponent } from './prostotak.component';

describe('ProstotakComponent', () => {
  let component: ProstotakComponent;
  let fixture: ComponentFixture<ProstotakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProstotakComponent],
    });
    fixture = TestBed.createComponent(ProstotakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
