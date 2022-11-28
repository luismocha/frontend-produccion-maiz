import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMusicComponent } from './top-music.component';

describe('TopMusicComponent', () => {
  let component: TopMusicComponent;
  let fixture: ComponentFixture<TopMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMusicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
