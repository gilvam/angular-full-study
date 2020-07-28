import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { DialogActionSimpleComponent } from './dialog-action-simple.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,

    // material
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  declarations: [
    DialogActionSimpleComponent,
  ],
  entryComponents: [
    DialogActionSimpleComponent,
  ],
  exports: [
    // DialogActionComponent,
  ],
})
export class UiDialogActionSimpleModule {
}
