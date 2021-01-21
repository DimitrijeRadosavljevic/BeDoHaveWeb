import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedThemeNotificationsComponent } from './subscribed-theme-notifications.component';

describe('SubscribedThemeNotificationsComponent', () => {
  let component: SubscribedThemeNotificationsComponent;
  let fixture: ComponentFixture<SubscribedThemeNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedThemeNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedThemeNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
