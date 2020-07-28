import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogHttpStatusComponent } from './dialog-http-status.component';

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
    MatListModule,
  ],
  declarations: [
    DialogHttpStatusComponent,
  ],
  entryComponents: [
    DialogHttpStatusComponent,
  ],
  exports: [
    DialogHttpStatusComponent,
  ],
})
export class UiDialogHttpStatusModule {
}
