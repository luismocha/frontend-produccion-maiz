import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPastelComponent } from './grafico-pastel.component';

describe('GraficoPastelComponent', () => {
  let component: GraficoPastelComponent;
  let fixture: ComponentFixture<GraficoPastelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoPastelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoPastelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
