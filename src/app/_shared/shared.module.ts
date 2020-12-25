import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()

  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
