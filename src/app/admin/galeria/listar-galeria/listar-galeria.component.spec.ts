import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarGaleriaComponent } from './listar-galeria.component';

describe('ListarGaleriaComponent', () => {
  let component: ListarGaleriaComponent;
  let fixture: ComponentFixture<ListarGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarGaleriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
