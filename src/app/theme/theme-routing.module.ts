import { ThemeDetailComponent } from './theme-detail/theme-detail.component';
import { ThemeEditorComponent } from './theme-editor/theme-editor.component';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { AuthGuard } from './../_shared/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EssayEditorComponent } from '../essay/essay-editor/essay-editor.component';


const routes: Routes = [
  {
    path: 'themes',
    //canActivate: [AuthGuard],
    children: [
      { path: '', component: ThemeListComponent },
      { path: 'create', component:ThemeEditorComponent },
      { path: ':themeId', component: ThemeDetailComponent},
      { path: ':themeId/edit', component: ThemeEditorComponent}
    ]

  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
