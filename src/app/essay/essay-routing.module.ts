import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../_shared/guards/auth.guard';

import {EssayDetailComponent} from './essay-detail/essay-detail.component';
import {EssayEditorComponent} from './essay-editor/essay-editor.component';

const routes: Routes = [
  {
    path: 'themes/:themeId/essays',
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: EssayEditorComponent },
      { path: ':essayId', component: EssayDetailComponent },
      { path: ':essayId/edit', component: EssayEditorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EssayRoutingModule {
}
