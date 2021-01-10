import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';

import { HabitRecordListComponent } from './habit-record-list/habit-record-list.component';



@NgModule({
    declarations: [HabitRecordListComponent],
    exports: [
        HabitRecordListComponent
    ],
    imports: [
        SharedModule
    ]
})
export class HabitRecordModule { }
