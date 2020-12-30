import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {AuthGuard} from './_shared/guards/auth.guard';

import {WelcomeComponent} from './_shared/components/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'welcome',
    canActivate: [AuthGuard],
    component: WelcomeComponent
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
