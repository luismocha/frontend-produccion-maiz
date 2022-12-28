import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerIntermediarioComponent } from './ver-intermediario.component';

describe('VerIntermediarioComponent', () => {
  let component: VerIntermediarioComponent;
  let fixture: ComponentFixture<VerIntermediarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerIntermediarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerIntermediarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
