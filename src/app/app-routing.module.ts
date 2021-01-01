import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {AuthGuard} from './_shared/guards/auth.guard';

import {WelcomeComponent} from './_shared/components/welcome/welcome.component';
import {EssayListComponent} from './essay/essay-list/essay-list.component';

const routes: Routes = [
  {
    path: 'welcome',
    canActivate: [AuthGuard],
    component: WelcomeComponent
  },
  {
    path: 'themes',
    loadChildren: () => import('./theme/theme.module').then(m => m.ThemeModule)
  },
  {
    path: 'themes/:themeId/essays',
    loadChildren: () => import('./essay/essay.module').then(m => m.EssayModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
