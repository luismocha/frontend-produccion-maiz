import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLugarComponent } from './listar-lugar.component';

describe('ListarLugarComponent', () => {
  let component: ListarLugarComponent;
  let fixture: ComponentFixture<ListarLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarLugarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
