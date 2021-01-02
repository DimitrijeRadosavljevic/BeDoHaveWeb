import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../_shared/guards/auth.guard';

import {EssayEditorComponent} from './essay-editor/essay-editor.component';
import { EssayListComponent } from './essay-list/essay-list.component';

const routes: Routes = [
  {
    path: '',
    component: EssayListComponent
  },
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
