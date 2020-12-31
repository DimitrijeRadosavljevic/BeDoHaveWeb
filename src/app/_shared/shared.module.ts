import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [WelcomeComponent, WelcomeCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
    }),
    NgxPaginationModule

  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,

    WelcomeComponent
  ]
})
export class SharedModule {
}
