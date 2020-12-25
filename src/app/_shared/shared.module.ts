import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';


@NgModule({
  declarations: [WelcomeComponent, WelcomeCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()

  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,

    WelcomeComponent
  ]
})
export class SharedModule {
}
