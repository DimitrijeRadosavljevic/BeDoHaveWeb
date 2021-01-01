import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ThemeDetailComponent} from './theme-detail/theme-detail.component';
import {ThemeEditorComponent} from './theme-editor/theme-editor.component';
import {ThemeListComponent} from './theme-list/theme-list.component';



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
    path: ':themeId',
    component: ThemeDetailComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {
}
