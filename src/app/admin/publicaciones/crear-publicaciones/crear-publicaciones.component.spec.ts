import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPublicacionesComponent } from './crear-publicaciones.component';

describe('CrearPublicacionesComponent', () => {
  let component: CrearPublicacionesComponent;
  let fixture: ComponentFixture<CrearPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPublicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
