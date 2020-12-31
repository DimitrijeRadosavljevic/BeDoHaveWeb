import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../_shared/guards/auth.guard';

import {EssayDetailComponent} from './essay-detail/essay-detail.component';
import {EssayEditorComponent} from './essay-editor/essay-editor.component';

const routes: Routes = [
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: EssayEditorComponent
  },
  {
    path: ':essayId',
    canActivate: [AuthGuard],
    component: EssayDetailComponent
  },
  {
    path: ':essayId/edit',
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
