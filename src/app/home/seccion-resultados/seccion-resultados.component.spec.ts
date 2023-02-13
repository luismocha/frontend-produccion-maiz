import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionResultadosComponent } from './seccion-resultados.component';

describe('SeccionResultadosComponent', () => {
  let component: SeccionResultadosComponent;
  let fixture: ComponentFixture<SeccionResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionResultadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
