import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPublicacionesComponent } from './formulario-publicaciones.component';

describe('FormularioPublicacionesComponent', () => {
  let component: FormularioPublicacionesComponent;
  let fixture: ComponentFixture<FormularioPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioPublicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
