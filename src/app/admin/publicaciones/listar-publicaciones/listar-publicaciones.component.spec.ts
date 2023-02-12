import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPublicacionesComponent } from './listar-publicaciones.component';

describe('ListarPublicacionesComponent', () => {
  let component: ListarPublicacionesComponent;
  let fixture: ComponentFixture<ListarPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPublicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
