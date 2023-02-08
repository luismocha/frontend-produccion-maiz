import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionGaleriaComponent } from './seccion-galeria.component';

describe('SeccionGaleriaComponent', () => {
  let component: SeccionGaleriaComponent;
  let fixture: ComponentFixture<SeccionGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionGaleriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
