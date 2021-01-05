import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { HabitListComponent } from './habit-list/habit-list.component';
import { HabitDetailComponent } from './habit-detail/habit-detail.component';
import { HabitEditorComponent } from './habit-editor/habit-editor.component';



const routes: Routes = [
  {
    path: '',
    component: HabitListComponent
  },
  {
    path: 'create',
    component: HabitEditorComponent
  },
  {
    path: ':habitId',
    component: HabitDetailComponent
  },
  {
    path: ':habitId/edit',
    component: HabitEditorComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitRoutingModule {
}
