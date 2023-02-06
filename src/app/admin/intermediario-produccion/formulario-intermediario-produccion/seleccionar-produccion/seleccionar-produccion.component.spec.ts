import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarProduccionComponent } from './seleccionar-produccion.component';

describe('SeleccionarProduccionComponent', () => {
  let component: SeleccionarProduccionComponent;
  let fixture: ComponentFixture<SeleccionarProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
