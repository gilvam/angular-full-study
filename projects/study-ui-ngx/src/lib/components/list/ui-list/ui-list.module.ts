import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiListComponent } from './ui-list.component';

@NgModule({
  imports: [
    CommonModule,

    // material

    // study-core

    // study-ui

    // plugins
  ],
  declarations: [
    UiListComponent,
  ],
  entryComponents: [
    UiListComponent,
  ],
  exports: [
    UiListComponent,
  ],
})
export class UiListModule {
}
