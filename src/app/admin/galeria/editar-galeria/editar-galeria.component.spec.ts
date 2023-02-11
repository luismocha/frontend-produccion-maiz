import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGaleriaComponent } from './editar-galeria.component';

describe('EditarGaleriaComponent', () => {
  let component: EditarGaleriaComponent;
  let fixture: ComponentFixture<EditarGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarGaleriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
