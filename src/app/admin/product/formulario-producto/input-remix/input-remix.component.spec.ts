import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRemixComponent } from './input-remix.component';

describe('InputRemixComponent', () => {
  let component: InputRemixComponent;
  let fixture: ComponentFixture<InputRemixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRemixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputRemixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
