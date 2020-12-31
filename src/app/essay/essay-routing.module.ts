import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../_shared/guards/auth.guard';

import {EssayEditorComponent} from './essay-editor/essay-editor.component';

const routes: Routes = [
  {
    path: 'create',
    component: EssayEditorComponent
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
