import {NgModule} from '@angular/core';

import {SharedModule} from '../_shared/shared.module';

import {EssayRoutingModule} from './essay-routing.module';

import {EssayListComponent} from './essay-list/essay-list.component';
import {EssayDetailComponent} from './essay-detail/essay-detail.component';
import {EssayEditorComponent} from './essay-editor/essay-editor.component';


@NgModule({
  declarations: [EssayListComponent, EssayDetailComponent, EssayEditorComponent],
  imports: [
    SharedModule,

    EssayRoutingModule
  ]
})
export class EssayModule {
}
