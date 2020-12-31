import {NgModule} from '@angular/core';

import {SharedModule} from '../_shared/shared.module';

import {EssayRoutingModule} from './essay-routing.module';

import {EssayListComponent} from './essay-list/essay-list.component';
import {EssayEditorComponent} from './essay-editor/essay-editor.component';
import {QuillModule} from 'ngx-quill';


@NgModule({
  declarations: [EssayListComponent,  EssayEditorComponent],
  imports: [
    SharedModule,

    EssayRoutingModule,
    QuillModule.forRoot()
  ]
})
export class EssayModule {
}
