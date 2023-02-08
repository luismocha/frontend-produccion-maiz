import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGaleriaComponent } from './crear-galeria.component';

describe('CrearGaleriaComponent', () => {
  let component: CrearGaleriaComponent;
  let fixture: ComponentFixture<CrearGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearGaleriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
