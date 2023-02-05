import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarProductorComponent } from './seleccionar-productor.component';

describe('SeleccionarProductorComponent', () => {
  let component: SeleccionarProductorComponent;
  let fixture: ComponentFixture<SeleccionarProductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarProductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarProductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
