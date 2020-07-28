import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiListCellComponent } from './ui-list-cell.component';

@NgModule({
  imports: [
    CommonModule,

    // material

    // study-core

    // study-ui

    // plugins
  ],
  declarations: [
    UiListCellComponent,
  ],
  entryComponents: [
    UiListCellComponent,
  ],
  exports: [
    UiListCellComponent,
  ],
})
export class UiListCellModule {
}
