import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRolComponent } from './formulario-rol.component';

describe('FormularioRolComponent', () => {
  let component: FormularioRolComponent;
  let fixture: ComponentFixture<FormularioRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
