import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModule } from '@app/user/user.module';
import { TagInputComponent } from './tag-input.component';

describe('TagInputComponent', () => {
  let component: TagInputComponent;
  let fixture: ComponentFixture<TagInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagInputComponent],
      imports: [UserModule],
    });
    fixture = TestBed.createComponent(TagInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
