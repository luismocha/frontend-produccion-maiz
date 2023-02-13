import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionPublicacionComponent } from './seccion-publicacion.component';

describe('SeccionPublicacionComponent', () => {
  let component: SeccionPublicacionComponent;
  let fixture: ComponentFixture<SeccionPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionPublicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
