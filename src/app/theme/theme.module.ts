import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';

import { ThemeListComponent } from './theme-list/theme-list.component';
import { ThemeEditorComponent } from './theme-editor/theme-editor.component';
import { ThemeDetailComponent } from './theme-detail/theme-detail.component';

import { ThemeRoutingModule } from './theme-routing.module';
import { EssayModule } from '../essay/essay.module';
import { ThemeDetailPublicComponent } from './theme-detail-public/theme-detail-public.component';
import { ThemeListPublicComponent } from './theme-list-public/theme-list-public.component';


@NgModule({
  declarations: [ThemeListComponent, ThemeEditorComponent, ThemeDetailComponent, ThemeDetailPublicComponent, ThemeListPublicComponent],
  imports: [
    SharedModule,
    ThemeRoutingModule,
    FormsModule,
    EssayModule
  ]
})
export class ThemeModule { }
