import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { ListMessageComponent } from './list-message.component';

@NgModule({
  imports: [
    // CommonModule,

    // material
    MatIconModule,

    // study-core

    // study-ui

    // plugins
  ],
  declarations: [
    ListMessageComponent,
  ],
  entryComponents: [
    ListMessageComponent,
  ],
  exports: [
    ListMessageComponent,
  ],
})
export class UiListMessageModule {
}
