import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';

import { HabitRoutingModule } from './habit-routing.module';

import { HabitListComponent } from './habit-list/habit-list.component';
import { HabitDetailComponent } from './habit-detail/habit-detail.component';
import { HabitEditorComponent } from './habit-editor/habit-editor.component';
import {HabitRecordModule} from '../habit-record/habit-record.module';



@NgModule({
  declarations: [HabitListComponent, HabitDetailComponent, HabitEditorComponent],
    imports: [
        SharedModule,

        HabitRoutingModule,
        HabitRecordModule
    ]
})
export class HabitModule { }
