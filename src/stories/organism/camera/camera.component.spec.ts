import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindValueInConfigByLangPipe } from '../../utils/pipes/find-value-in-config-by-lang.pipe';
import { CameraComponent } from './camera.component';

describe('CameraComponent', () => {
  let component: CameraComponent;
  let fixture: ComponentFixture<CameraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraComponent, FindValueInConfigByLangPipe ],
    })
    fixture = TestBed.createComponent(CameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
