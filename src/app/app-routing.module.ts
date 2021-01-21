import { SubscribedThemeNotificationsComponent } from './_shared/components/subscribed-theme-notifications/subscribed-theme-notifications.component';
import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {AuthGuard} from './_shared/guards/auth.guard';

import {WelcomeComponent} from './_shared/components/welcome/welcome.component';
import { NotificationsComponent } from './_shared/components/notifications/notifications.component';

const routes: Routes = [
  {
    path: 'welcome',
    canActivate: [AuthGuard],
    component: WelcomeComponent
  },
  {
    path: 'welcome/notifications',
    component: NotificationsComponent
  },
  {
    path: 'welcome/subscribedThemeNotifications',
    component: SubscribedThemeNotificationsComponent
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
    path: 'habits',
    loadChildren: () => import('./habit/habit.module').then(m => m.HabitModule)
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
