import {NgModule} from '@angular/core';

import {SharedModule} from '../_shared/shared.module';

import {EssayRoutingModule} from './essay-routing.module';

import {EssayListComponent} from './essay-list/essay-list.component';
import {EssayEditorComponent} from './essay-editor/essay-editor.component';
import {QuillModule} from 'ngx-quill';
import { EssayDetailComponent } from './essay-detail/essay-detail.component';


@NgModule({
  declarations: [EssayListComponent,  EssayEditorComponent, EssayDetailComponent],
  imports: [
    SharedModule,

    EssayRoutingModule,
    QuillModule.forRoot()
  ],
  exports: [
    EssayListComponent
  ]
})
export class EssayModule {
}
