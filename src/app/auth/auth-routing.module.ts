import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {GuestGuard} from '../_shared/guards/guest.guard';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [GuestGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [GuestGuard],
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
