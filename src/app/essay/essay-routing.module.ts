import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../_shared/guards/auth.guard';

import {EssayEditorComponent} from './essay-editor/essay-editor.component';
import {EssayDetailComponent} from './essay-detail/essay-detail.component';

const routes: Routes = [
  {
    path: 'create',
    component: EssayEditorComponent
  },
  {
    path: ':essayId',
    component: EssayDetailComponent
  },
  {
    path: ':essayId/public',
    component: EssayDetailComponent
  },
  {
    path: ':essayId/edit',
    canActivate: [AuthGuard],
    component: EssayEditorComponent
  },
  {
    path: ':essayId/edit/public',
    canActivate: [AuthGuard],
    component: EssayEditorComponent
  },
  {
    path: 'public/create',
    canActivate: [AuthGuard],
    component: EssayEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EssayRoutingModule {
}
