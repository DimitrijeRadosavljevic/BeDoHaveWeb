import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {WelcomeCardComponent} from './components/welcome-card/welcome-card.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterModule} from '@angular/router';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { NotificationsComponent } from './components/notifications/notifications.component';
import {MomentModule} from 'ngx-moment';
import { SubscribedThemeNotificationsComponent } from './components/subscribed-theme-notifications/subscribed-theme-notifications.component';


@NgModule({
  declarations: [WelcomeComponent, WelcomeCardComponent, NotificationsComponent, SubscribedThemeNotificationsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
    }),
    NgxPaginationModule,
    RouterModule,
    NgMultiSelectDropDownModule.forRoot(),
    MomentModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    WelcomeComponent,
    NotificationsComponent,
    MomentModule
  ]
})
export class SharedModule {
}
