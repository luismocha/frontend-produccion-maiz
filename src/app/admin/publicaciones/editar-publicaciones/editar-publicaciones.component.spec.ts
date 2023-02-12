import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPublicacionesComponent } from './editar-publicaciones.component';

describe('EditarPublicacionesComponent', () => {
  let component: EditarPublicacionesComponent;
  let fixture: ComponentFixture<EditarPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPublicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
