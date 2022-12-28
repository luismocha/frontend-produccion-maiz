import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioLugarComponent } from './formulario-lugar.component';

describe('FormularioLugarComponent', () => {
  let component: FormularioLugarComponent;
  let fixture: ComponentFixture<FormularioLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioLugarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
