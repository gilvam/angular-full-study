import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { UiDialogActionModule } from '../../dialog/action/ui-dialog-action.module';
import { MenuActionMoreVerticalComponent } from './menu-action-more-vertical.component';
import { UiDialogActionSimpleModule } from '../../dialog/action-simple/ui-dialog-action-simple.module';

@NgModule({
  imports: [
    CommonModule,

    // material
    MatIconModule,
    MatButtonModule,
    MatMenuModule,

    // study-core
    // study-ui
    UiDialogActionModule,
    UiDialogActionSimpleModule,
  ],
  declarations: [
    MenuActionMoreVerticalComponent,
  ],
  entryComponents: [
    MenuActionMoreVerticalComponent,
  ],
  exports: [
    MenuActionMoreVerticalComponent,
  ],
})
export class UiMenuActionMoreVerticalModule {
}
