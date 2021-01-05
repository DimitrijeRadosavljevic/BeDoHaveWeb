import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';

import { HabitRoutingModule } from './habit-routing.module';

import { HabitListComponent } from './habit-list/habit-list.component';
import { HabitDetailComponent } from './habit-detail/habit-detail.component';
import { HabitEditorComponent } from './habit-editor/habit-editor.component';



@NgModule({
  declarations: [HabitListComponent, HabitDetailComponent, HabitEditorComponent],
  imports: [
    SharedModule,

    HabitRoutingModule
  ]
})
export class HabitModule { }
