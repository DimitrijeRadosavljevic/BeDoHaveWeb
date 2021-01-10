import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeListPublicComponent } from './theme-list-public.component';

describe('ThemeListPublicComponent', () => {
  let component: ThemeListPublicComponent;
  let fixture: ComponentFixture<ThemeListPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeListPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeListPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
