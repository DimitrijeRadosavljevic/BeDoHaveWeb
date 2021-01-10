import { ThemeListPublicComponent } from './theme-list-public/theme-list-public.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ThemeDetailComponent} from './theme-detail/theme-detail.component';
import {ThemeEditorComponent} from './theme-editor/theme-editor.component';
import {ThemeListComponent} from './theme-list/theme-list.component';
import {ThemeDetailPublicComponent} from './theme-detail-public/theme-detail-public.component';



const routes: Routes = [
  {
    path: '',
    component: ThemeListComponent
  },
  {
    path: 'create',
    component: ThemeEditorComponent
  },
  {
    path: ':themeId/edit',
    component: ThemeEditorComponent
  },
  {
    path: ':themeId',
    component: ThemeDetailComponent
  },
  {
    path: ':themeId/public',
    component: ThemeDetailPublicComponent
  },
  {
    path: 'public/themes',
    component: ThemeListPublicComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {
}
