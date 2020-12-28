import { ThemeRoutingModule } from './theme-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeListComponent } from './theme-list/theme-list.component';
import { ThemeEditorComponent } from './theme-editor/theme-editor.component';
import { ThemeDetailComponent } from './theme-detail/theme-detail.component';



@NgModule({
  declarations: [ThemeListComponent, ThemeEditorComponent, ThemeDetailComponent],
  imports: [
    CommonModule,
    ThemeRoutingModule
  ]
})
export class ThemeModule { }
