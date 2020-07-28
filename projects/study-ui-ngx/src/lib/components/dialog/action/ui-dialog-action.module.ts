import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { DialogActionComponent } from './dialog-action.component';
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
    DialogActionComponent,
  ],
  entryComponents: [
    DialogActionComponent,
  ],
  exports: [
    // DialogActionComponent,
  ],
})
export class UiDialogActionModule {
}
