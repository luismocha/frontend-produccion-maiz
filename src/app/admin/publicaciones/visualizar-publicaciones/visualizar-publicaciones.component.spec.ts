import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPublicacionesComponent } from './visualizar-publicaciones.component';

describe('VisualizarPublicacionesComponent', () => {
  let component: VisualizarPublicacionesComponent;
  let fixture: ComponentFixture<VisualizarPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarPublicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
